import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { TelemetryService } from '../../observability/telemetry.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly telemetry: TelemetryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>() as any;
    const route = request?.route?.path ?? 'unknown';
    const method = request?.method ?? 'unknown';

    return next.handle().pipe(
      tap(() => this.telemetry.incrementRequest(route, method))
    );
  }
}
