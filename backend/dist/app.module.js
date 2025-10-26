"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const validation_1 = require("./config/validation");
const auth_module_1 = require("./auth/auth.module");
const content_module_1 = require("./content/content.module");
const database_module_1 = require("./database/database.module");
const observability_module_1 = require("./observability/observability.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
                load: [configuration_1.default],
                validationSchema: validation_1.validationSchema
            }),
            database_module_1.DatabaseModule,
            observability_module_1.ObservabilityModule,
            auth_module_1.AuthModule,
            content_module_1.ContentModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map