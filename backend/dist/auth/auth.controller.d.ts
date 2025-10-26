import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginDto): Promise<{
        mfaRequired: boolean;
        challengeId: string;
        message: string;
    }>;
    verifyMfa(payload: VerifyMfaDto): Promise<{
        accessToken: string;
    }>;
    me(request: Request): Express.User;
    sso(): Promise<{
        status: string;
    }>;
    ssoCallback(request: Request): Promise<{
        accessToken: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map