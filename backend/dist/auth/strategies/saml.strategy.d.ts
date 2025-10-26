import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-saml';
declare const SamlStrategy_base: new (...args: any[]) => Strategy;
export declare class SamlStrategy extends SamlStrategy_base {
    constructor(configService: ConfigService);
    validate(profile: any): Promise<{
        id: any;
        email: any;
        roles: any;
    }>;
}
export {};
//# sourceMappingURL=saml.strategy.d.ts.map