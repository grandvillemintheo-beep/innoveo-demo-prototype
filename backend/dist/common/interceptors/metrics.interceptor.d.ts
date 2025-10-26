import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TelemetryService } from '../../observability/telemetry.service';
export declare class MetricsInterceptor implements NestInterceptor {
    private readonly telemetry;
    constructor(telemetry: TelemetryService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=metrics.interceptor.d.ts.map