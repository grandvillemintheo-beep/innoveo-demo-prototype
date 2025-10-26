import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { MetricsController } from './prometheus.controller';
import { ObservabilityController } from './observability.controller';
import { LoggerService } from './logger.service';
import { TelemetryService } from './telemetry.service';
import { MetricsInterceptor } from '../common/interceptors/metrics.interceptor';

@Module({
  imports: [
    ConfigModule,
    TerminusModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
      }
    })
  ],
  controllers: [ObservabilityController, MetricsController],
  providers: [
    LoggerService,
    TelemetryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor
    }
  ],
  exports: [LoggerService, TelemetryService]
})
export class ObservabilityModule {}
