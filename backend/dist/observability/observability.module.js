"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const prometheus_controller_1 = require("./prometheus.controller");
const observability_controller_1 = require("./observability.controller");
const logger_service_1 = require("./logger.service");
const telemetry_service_1 = require("./telemetry.service");
const metrics_interceptor_1 = require("../common/interceptors/metrics.interceptor");
let ObservabilityModule = class ObservabilityModule {
};
exports.ObservabilityModule = ObservabilityModule;
exports.ObservabilityModule = ObservabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            terminus_1.TerminusModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
                }
            })
        ],
        controllers: [observability_controller_1.ObservabilityController, prometheus_controller_1.MetricsController],
        providers: [
            logger_service_1.LoggerService,
            telemetry_service_1.TelemetryService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: metrics_interceptor_1.MetricsInterceptor
            }
        ],
        exports: [logger_service_1.LoggerService, telemetry_service_1.TelemetryService]
    })
], ObservabilityModule);
//# sourceMappingURL=observability.module.js.map