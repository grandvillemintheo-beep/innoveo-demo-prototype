import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { startTracing, stopTracing } from './observability/tracing';

async function bootstrap() {
  await startTracing();
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
  Logger.log(`Innoveo API is running on http://localhost:${port}/${globalPrefix}`);

  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];
  shutdownSignals.forEach((signal) => {
    process.on(signal, async () => {
      Logger.log(`Received ${signal}, starting graceful shutdown`);
      await app.close();
      await stopTracing();
      process.exit(0);
    });
  });
}

void bootstrap();