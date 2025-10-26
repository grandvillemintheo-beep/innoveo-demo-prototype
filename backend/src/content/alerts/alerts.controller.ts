import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AlertsService } from './alerts.service';
import { GetAlertsQueryDto } from './dto/get-alerts-query.dto';

@Controller('alerts')
@UseGuards(AuthGuard('jwt'))
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  findAll(@Query() query: GetAlertsQueryDto) {
    return this.alertsService.findAll(query);
  }
}
