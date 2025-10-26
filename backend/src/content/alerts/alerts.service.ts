import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

import { Alert } from './entities/alert.entity';
import { GetAlertsQueryDto } from './dto/get-alerts-query.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>
  ) {}

  async findAll(query: GetAlertsQueryDto) {
    const { severity, statuses, siteId, search, limit } = query;

    const filters: FindOptionsWhere<Alert> = {};

    if (severity) {
      filters.severity = severity;
    }

    if (siteId) {
      filters.siteId = siteId;
    }

    if (statuses && statuses.length > 0) {
      filters.status = In(statuses);
    }

    const take = limit ?? 50;

    if (search && search.trim().length > 0) {
      const likeValue = `%${search.trim().replace(/[%_]/g, (match) => `\\${match}`)}%`;
      return this.alertsRepository.find({
        where: [
          { ...filters, title: ILike(likeValue) },
          { ...filters, siteName: ILike(likeValue) },
          { ...filters, type: ILike(likeValue) }
        ],
        order: { occurredAt: 'DESC' },
        take
      });
    }

    return this.alertsRepository.find({
      where: filters,
      order: { occurredAt: 'DESC' },
      take
    });
  }
}
