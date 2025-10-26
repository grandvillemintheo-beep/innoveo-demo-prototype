import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Content } from '../content/entities/content.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const sslEnabled = config.get<boolean>('database.ssl');
        const sslMode = config.get<string>('database.sslMode');
        const caCert = config.get<string>('database.caCertificate');

        const sslOptions = (() => {
          if (!sslEnabled && !caCert) {
            return false;
          }

          if (!sslEnabled) {
            return undefined;
          }

          const rejectUnauthorized = ['verify-ca', 'verify-full'].includes(sslMode ?? 'require');

          return {
            rejectUnauthorized,
            ca: caCert ? Buffer.from(caCert, 'base64').toString('utf8') : undefined
          };
        })();

        return {
          type: 'postgres',
          url: config.get<string>('database.url'),
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          database: config.get<string>('database.database'),
          ssl: sslOptions,
          autoLoadEntities: true,
          synchronize: false
        };
      }
    }),
    TypeOrmModule.forFeature([User, Content])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
