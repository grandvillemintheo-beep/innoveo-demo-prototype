import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class ObservabilityController {
    private readonly health;
    private readonly db;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
//# sourceMappingURL=observability.controller.d.ts.map