import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.authService.initiateLogin(payload);
  }

  @Post('mfa/verify')
  async verifyMfa(@Body() payload: VerifyMfaDto) {
    return this.authService.verifyMfa(payload);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() request: Request) {
    return request.user;
  }

  @Get('sso')
  @UseGuards(AuthGuard('saml'))
  async sso() {
    return { status: 'redirected' };
  }

  @Post('sso/callback')
  @UseGuards(AuthGuard('saml'))
  async ssoCallback(@Req() request: Request) {
    return this.authService.issueJwt(request.user);
  }
}
