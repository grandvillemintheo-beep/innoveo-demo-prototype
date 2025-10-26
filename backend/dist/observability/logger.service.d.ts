import { LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
export declare class LoggerService implements NestLoggerService {
    private readonly logger;
    constructor(logger: Logger);
    log(message: any, context?: any): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: any): void;
    debug?(message: any, context?: any): void;
    verbose?(message: any, context?: any): void;
    info(message: any, context?: any): void;
}
//# sourceMappingURL=logger.service.d.ts.map