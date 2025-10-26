import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Counter, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class TelemetryService {
  private readonly registry: Registry;
  private readonly requestCounter: Counter<string>;

  constructor(config: ConfigService) {
    const serviceName = config.get<string>('telemetry.serviceName') ?? 'innoveo-api';
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry, prefix: `${serviceName}_` });

    this.requestCounter = new Counter({
      name: 'api_requests_total',
      help: 'Total number of API requests received',
      labelNames: ['route', 'method'],
      registers: [this.registry]
    });
  }

  incrementRequest(route: string, method: string) {
    this.requestCounter.inc({ route, method });
  }

  async getMetrics() {
    return this.registry.metrics();
  }
}
