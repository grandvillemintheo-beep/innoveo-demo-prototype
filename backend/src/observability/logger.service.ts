import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: any, context?: any) {
    this.logger.log(context ?? {}, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ trace, context }, message);
  }

  warn(message: any, context?: any) {
    this.logger.warn(context ?? {}, message);
  }

  debug?(message: any, context?: any) {
    this.logger.debug?.(context ?? {}, message);
  }

  verbose?(message: any, context?: any) {
    const payload = context ?? {};
    const loggerWithTrace = this.logger as {
      trace?: (ctx: any, msg?: any) => void;
    };

    if (typeof loggerWithTrace.trace === 'function') {
      loggerWithTrace.trace(payload, message);
      return;
    }

    this.logger.debug?.(payload, message);
  }

  info(message: any, context?: any) {
    this.logger.log(context ?? {}, message);
  }
}
