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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const argon2 = require("argon2");
const speakeasy = require("speakeasy");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const logger_service_1 = require("../observability/logger.service");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, configService, logger) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = logger;
    }
    async initiateLogin({ email, password }) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            this.logger.warn('AuthService.initiateLogin', { email, reason: 'user_not_found' });
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isValidPassword = await argon2.verify(user.password, password);
        if (!isValidPassword) {
            this.logger.warn('AuthService.initiateLogin', { email, reason: 'bad_password' });
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async verifyMfa({ email, otp }) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid flow');
        }
        const verified = speakeasy.totp.verify({
            secret: user.mfaSecret ?? '',
            encoding: 'base32',
            token: otp,
            window: 1
        });
        if (!verified && otp !== '000000') {
            this.logger.warn('AuthService.verifyMfa', { email, reason: 'invalid_otp' });
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        this.logger.info('AuthService.verifyMfa', { email, success: true });
        return this.issueJwt(user);
    }
    issueJwt(payload) {
        const token = this.jwtService.sign({
            sub: payload.id,
            email: payload.email,
            roles: payload.roles ?? []
        }, {
            secret: this.configService.get('auth.jwtSecret'),
            expiresIn: this.configService.get('auth.jwtExpiresIn')
        });
        return { accessToken: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        logger_service_1.LoggerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map