"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prom_client_1 = require("prom-client");
let TelemetryService = class TelemetryService {
    constructor(config) {
        const serviceName = config.get('telemetry.serviceName') ?? 'innoveo-api';
        this.registry = new prom_client_1.Registry();
        (0, prom_client_1.collectDefaultMetrics)({ register: this.registry, prefix: `${serviceName}_` });
        this.requestCounter = new prom_client_1.Counter({
            name: 'api_requests_total',
            help: 'Total number of API requests received',
            labelNames: ['route', 'method'],
            registers: [this.registry]
        });
    }
    incrementRequest(route, method) {
        this.requestCounter.inc({ route, method });
    }
    async getMetrics() {
        return this.registry.metrics();
    }
};
exports.TelemetryService = TelemetryService;
exports.TelemetryService = TelemetryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelemetryService);
//# sourceMappingURL=telemetry.service.js.map