import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-saml';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor(configService: ConfigService) {
    super({
      path: '/api/auth/sso/callback',
      entryPoint: configService.get<string>('auth.samlEntryPoint'),
      issuer: configService.get<string>('auth.samlIssuer'),
      callbackUrl: configService.get<string>('auth.samlCallbackUrl'),
      cert: configService.get<string>('auth.samlCertificate') ?? undefined,
      acceptedClockSkewMs: 2000
    });
  }

  async validate(profile: any) {
    return {
      id: profile?.nameID,
      email: profile?.email || profile?.nameID,
      roles: profile?.roles ?? []
    };
  }
}
