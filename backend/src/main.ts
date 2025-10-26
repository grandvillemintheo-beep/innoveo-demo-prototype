import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, { exclude: ['health', 'metrics'] });
  app.useLogger(app.get(PinoLogger));
  app.use(helmet());

  const port = configService.get<number>('http.port', { infer: true }) ?? 3000;
  await app.listen(port);
  Logger.log(`íº€ Innoveo API is running on http://localhost:${port}/${globalPrefix}`);
}

void bootstrap();
