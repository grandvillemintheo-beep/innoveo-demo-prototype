import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { DatabaseModule } from './database/database.module';
import { ObservabilityModule } from './observability/observability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
      validationSchema
    }),
    DatabaseModule,
    ObservabilityModule,
    AuthModule,
    ContentModule
  ]
})
export class AppModule {}
