import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret')
    });
  }

  async validate(payload: { sub: string; email: string; roles: string[]; displayName?: string }) {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
      displayName: payload.displayName ?? payload.email
    };
  }
}
