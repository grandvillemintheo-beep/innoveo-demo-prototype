"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_saml_1 = require("passport-saml");
let SamlStrategy = class SamlStrategy extends (0, passport_1.PassportStrategy)(passport_saml_1.Strategy, 'saml') {
    constructor(configService) {
        super({
            path: '/api/auth/sso/callback',
            entryPoint: configService.get('auth.samlEntryPoint'),
            issuer: configService.get('auth.samlIssuer'),
            callbackUrl: configService.get('auth.samlCallbackUrl'),
            cert: configService.get('auth.samlCertificate') ?? undefined,
            acceptedClockSkewMs: 2000
        });
    }
    async validate(profile) {
        return {
            id: profile?.nameID,
            email: profile?.email || profile?.nameID,
            roles: profile?.roles ?? []
        };
    }
};
exports.SamlStrategy = SamlStrategy;
exports.SamlStrategy = SamlStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SamlStrategy);
//# sourceMappingURL=saml.strategy.js.map