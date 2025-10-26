import { validationSchema } from './validation';

describe('validationSchema', () => {
  it('accepts a complete configuration', () => {
    const { error, value } = validationSchema.validate({
      NODE_ENV: 'test',
      PORT: 3100,
      POSTGRES_HOST: 'localhost',
      POSTGRES_PORT: 5432,
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'innoveo',
      POSTGRES_SSL: false,
      POSTGRES_SSL_MODE: 'disable',
      JWT_SECRET: 'averysecuresecretkey',
      JWT_EXPIRES_IN: '20m',
      SAML_ENTRY_POINT: 'https://sso.example.com',
      SAML_ISSUER: 'innoveo-demo',
      SAML_CALLBACK_URL: 'http://localhost:3000/api/auth/sso/callback',
      OTEL_SERVICE_NAME: 'innoveo-api',
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://otel-collector:4318'
    });

    expect(error).toBeUndefined();
    expect(value.NODE_ENV).toBe('test');
    expect(value.POSTGRES_SSL_MODE).toBe('disable');
  });

  it('rejects an invalid ssl mode', () => {
    const { error } = validationSchema.validate({
      NODE_ENV: 'production',
      PORT: 3000,
      POSTGRES_HOST: 'localhost',
      POSTGRES_PORT: 5432,
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'innoveo',
      POSTGRES_SSL: false,
      POSTGRES_SSL_MODE: 'invalid',
      JWT_SECRET: 'averysecuresecretkey',
      JWT_EXPIRES_IN: '20m',
      SAML_ENTRY_POINT: 'https://sso.example.com',
      SAML_ISSUER: 'innoveo-demo',
      SAML_CALLBACK_URL: 'http://localhost:3000/api/auth/sso/callback',
      OTEL_SERVICE_NAME: 'innoveo-api',
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://otel-collector:4318'
    });

    expect(error).toBeDefined();
  });
});
