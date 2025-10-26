import 'reflect-metadata';

import { DataSource } from 'typeorm';

import configuration from '../config/configuration';
import { Content } from './entities/content.entity';
import { User } from './entities/user.entity';

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
  migrations: ['dist/database/migrations/*.js']
});

export default AppDataSource;
