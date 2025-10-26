import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  POSTGRES_URL: Joi.string().uri().optional(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_SSL: Joi.boolean().default(false),
  POSTGRES_SSL_MODE: Joi.string()
    .valid('disable', 'require', 'verify-ca', 'verify-full')
    .default('require'),
  POSTGRES_CA_CERT: Joi.string().allow('').optional(),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  SAML_ENTRY_POINT: Joi.string().uri().default('https://sso.example.com'),
  SAML_ISSUER: Joi.string().default('innoveo-demo'),
  SAML_CALLBACK_URL: Joi.string().uri().default('http://localhost:3000/api/auth/sso/callback'),
  SAML_CERTIFICATE: Joi.string().allow('').optional(),
  OTEL_SERVICE_NAME: Joi.string().default('innoveo-api'),
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().uri().required()
});
