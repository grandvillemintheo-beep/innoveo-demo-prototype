import { ConfigService } from '@nestjs/config';
export declare class TelemetryService {
    private readonly registry;
    private readonly requestCounter;
    constructor(config: ConfigService);
    incrementRequest(route: string, method: string): void;
    getMetrics(): Promise<string>;
}
//# sourceMappingURL=telemetry.service.d.ts.map