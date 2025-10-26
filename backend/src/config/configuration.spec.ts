import configuration from './configuration';

describe('configuration', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns defaults when optional values are not provided', () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: undefined,
      PORT: undefined,
      POSTGRES_HOST: 'localhost',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'innoveo',
      JWT_SECRET: 'averysecuresecretkey',
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://otel-collector:4318'
    } as NodeJS.ProcessEnv;

    const config = configuration();

    expect(config.nodeEnv).toBe('development');
    expect(config.http.port).toBe(3000);
    expect(config.database.port).toBe(5432);
    expect(config.database.ssl).toBe(false);
    expect(config.auth.jwtExpiresIn).toBe('15m');
    expect(config.telemetry.collectorUrl).toBe('http://otel-collector:4318');
  });

  it('parses provided environment variables', () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
      PORT: '4000',
      POSTGRES_HOST: 'db.internal',
      POSTGRES_PORT: '6543',
      POSTGRES_USER: 'svc',
      POSTGRES_PASSWORD: 'secret',
      POSTGRES_DB: 'prod',
      POSTGRES_SSL: 'true',
      POSTGRES_SSL_MODE: 'verify-full',
      POSTGRES_CA_CERT: 'CA_DATA',
      JWT_SECRET: 'averysecuresecretkey',
      JWT_EXPIRES_IN: '30m',
      SAML_ENTRY_POINT: 'https://idp.example.com',
      SAML_ISSUER: 'innoveo-prod',
      SAML_CALLBACK_URL: 'https://api.example.com/auth/callback',
      SAML_CERTIFICATE: 'CERT',
      OTEL_SERVICE_NAME: 'innoveo-service',
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://collector.example.com'
    } as NodeJS.ProcessEnv;

    const config = configuration();

    expect(config.nodeEnv).toBe('production');
    expect(config.http.port).toBe(4000);
    expect(config.database).toEqual(
      expect.objectContaining({
        host: 'db.internal',
        port: 6543,
        username: 'svc',
        password: 'secret',
        database: 'prod',
        ssl: true,
        sslMode: 'verify-full',
        caCertificate: 'CA_DATA'
      })
    );
    expect(config.auth).toEqual(
      expect.objectContaining({
        jwtSecret: 'averysecuresecretkey',
        jwtExpiresIn: '30m',
        samlEntryPoint: 'https://idp.example.com',
        samlIssuer: 'innoveo-prod',
        samlCallbackUrl: 'https://api.example.com/auth/callback',
        samlCertificate: 'CERT'
      })
    );
    expect(config.telemetry).toEqual(
      expect.objectContaining({
        serviceName: 'innoveo-service',
        collectorUrl: 'https://collector.example.com'
      })
    );
  });
});
