import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { LoggerService } from '../observability/logger.service';
import { LoginDto } from './dto/login.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, configService: ConfigService, logger: LoggerService);
    initiateLogin({ email, password }: LoginDto): Promise<{
        mfaRequired: boolean;
        challengeId: string;
        message: string;
    }>;
    verifyMfa({ email, otp }: VerifyMfaDto): Promise<{
        accessToken: string;
    }>;
    issueJwt(payload: any): {
        accessToken: string;
    };
}
//# sourceMappingURL=auth.service.d.ts.map