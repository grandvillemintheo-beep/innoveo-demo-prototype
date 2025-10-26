import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_SSL: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  SAML_ENTRY_POINT: Joi.string().uri().required(),
  SAML_ISSUER: Joi.string().required(),
  SAML_CALLBACK_URL: Joi.string().uri().required(),
  SAML_CERTIFICATE: Joi.string().optional(),
  OTEL_SERVICE_NAME: Joi.string().default('innoveo-api'),
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().uri().required()
});
