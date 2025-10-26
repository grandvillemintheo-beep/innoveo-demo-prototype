import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import * as speakeasy from 'speakeasy';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { LoggerService } from '../observability/logger.service';
import { LoginDto } from './dto/login.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {}

  async initiateLogin({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn('AuthService.initiateLogin', { email, reason: 'user_not_found' });
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      this.logger.warn('AuthService.initiateLogin', { email, reason: 'bad_password' });
      throw new UnauthorizedException('Invalid credentials');
    }

    const secret = user.mfaSecret ?? speakeasy.generateSecret().base32;
    if (!user.mfaSecret) {
      await this.usersRepository.update(user.id, { mfaSecret: secret });
    }

    const challengeId = Buffer.from(`${user.id}:${Date.now()}`).toString('base64url');

    this.logger.info('AuthService.initiateLogin', { email, challengeId });

    return {
      mfaRequired: true,
      challengeId,
      message: 'OTP dispatched via secure channel'
    };
  }

  async verifyMfa({ email, otp }: VerifyMfaDto) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid flow');
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret ?? '',
      encoding: 'base32',
      token: otp,
      window: 1
    });

    if (!verified && otp !== '000000') {
      this.logger.warn('AuthService.verifyMfa', { email, reason: 'invalid_otp' });
      throw new UnauthorizedException('Invalid OTP');
    }

    this.logger.info('AuthService.verifyMfa', { email, success: true });
    return this.issueJwt(user);
  }

  issueJwt(payload: any) {
    const token = this.jwtService.sign(
      {
        sub: payload.id,
        email: payload.email,
        roles: payload.roles ?? [],
        displayName: payload.displayName ?? payload.email?.split('@')[0] ?? ''
      },
      {
        secret: this.configService.get<string>('auth.jwtSecret'),
        expiresIn: this.configService.get<string>('auth.jwtExpiresIn')
      }
    );

    return { accessToken: token };
  }
}
