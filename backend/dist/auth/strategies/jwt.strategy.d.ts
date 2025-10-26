import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: {
        sub: string;
        email: string;
        roles: string[];
    }): Promise<{
        id: string;
        email: string;
        roles: string[];
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map