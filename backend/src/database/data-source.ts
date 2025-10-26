import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { join } from 'path';
import { config as loadEnv } from 'dotenv';

import configuration from '../config/configuration';
import { Content } from '../content/entities/content.entity';
import { User } from './entities/user.entity';

loadEnv({ path: join(process.cwd(), '.env') });
loadEnv({ path: join(process.cwd(), '.env.local'), override: true });

const config = configuration();

const sslOptions = (() => {
  if (!config.database.ssl && !config.database.caCertificate) {
    return false;
  }

  if (!config.database.ssl) {
    return undefined;
  }

  const rejectUnauthorized =
    (config.database.sslMode ?? 'require') === 'verify-full' ||
    (config.database.sslMode ?? 'require') === 'verify-ca';

  const ca = config.database.caCertificate
    ? Buffer.from(config.database.caCertificate, 'base64').toString('utf8')
    : undefined;

  return {
    rejectUnauthorized,
    ca
  };
})();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.database.url,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  ssl: sslOptions,
  entities: [User, Content],
  synchronize: false,
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')]
});

export default AppDataSource;
