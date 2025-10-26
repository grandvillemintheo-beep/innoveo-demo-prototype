export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  http: {
    port: parseInt(process.env.PORT ?? '3000', 10)
  },
  database: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'innoveo',
    ssl: process.env.POSTGRES_SSL === 'true'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    samlEntryPoint: process.env.SAML_ENTRY_POINT ?? 'https://sso.example.com',
    samlIssuer: process.env.SAML_ISSUER ?? 'innoveo-demo',
    samlCallbackUrl: process.env.SAML_CALLBACK_URL ?? 'http://localhost:3000/api/auth/sso/callback',
    samlCertificate: process.env.SAML_CERTIFICATE
  },
  telemetry: {
    serviceName: process.env.OTEL_SERVICE_NAME ?? 'innoveo-api',
    collectorUrl: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://otel-collector:4318'
  }
});
