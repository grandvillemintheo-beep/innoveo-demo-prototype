declare module 'passport-saml' {
  import type { Profile } from 'passport';
  import type { Request } from 'express';

  export interface SamlOptions {
    entryPoint?: string;
    issuer?: string;
    callbackUrl?: string;
    cert?: string;
    path?: string;
    acceptedClockSkewMs?: number;
    [key: string]: unknown;
  }

  export interface VerifiedUser {
    nameID?: string;
    email?: string;
    [key: string]: unknown;
  }

  export type VerifyWithRequest = (
    req: Request,
    profile: Profile,
    done: (err: Error | null, user?: VerifiedUser) => void
  ) => void;

  export type VerifyWithoutRequest = (
    profile: Profile,
    done: (err: Error | null, user?: VerifiedUser) => void
  ) => void;

  export class Strategy {
    constructor(options: SamlOptions, verify?: VerifyWithRequest | VerifyWithoutRequest);
  }
}
