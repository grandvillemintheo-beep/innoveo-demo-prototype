import { TelemetryService } from './telemetry.service';
export declare class MetricsController {
    private readonly telemetry;
    constructor(telemetry: TelemetryService);
    metrics(): Promise<string>;
}
//# sourceMappingURL=prometheus.controller.d.ts.map