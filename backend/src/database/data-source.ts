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

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  ssl: config.database.ssl,
  entities: [User, Content],
  synchronize: false,
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')]
});

export default AppDataSource;
