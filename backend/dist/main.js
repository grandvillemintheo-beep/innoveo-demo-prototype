"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true
    });
    const configService = app.get(config_1.ConfigService);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix, { exclude: ['health', 'metrics'] });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.use((0, helmet_1.default)());
    const port = configService.get('http.port', { infer: true }) ?? 3000;
    await app.listen(port);
    common_1.Logger.log(`��� Innoveo API is running on http://localhost:${port}/${globalPrefix}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map