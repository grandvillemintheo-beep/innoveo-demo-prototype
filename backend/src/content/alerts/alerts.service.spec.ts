import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { Alert, AlertSeverity, AlertStatus } from './entities/alert.entity';
import { AlertsService } from './alerts.service';

describe('AlertsService', () => {
  let service: AlertsService;
  let repository: jest.Mocked<Repository<Alert>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            find: jest.fn()
          }
        }
      ]
    }).compile();

    service = moduleRef.get(AlertsService);
    repository = moduleRef.get(getRepositoryToken(Alert));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('requests alerts with severity and status filters', async () => {
    repository.find.mockResolvedValue([]);

    await service.findAll({
      severity: AlertSeverity.CRITICAL,
      statuses: [AlertStatus.OPEN, AlertStatus.ACKNOWLEDGED]
    });

    expect(repository.find).toHaveBeenCalledTimes(1);
    const args = repository.find.mock.calls[0][0];
    expect(args).toMatchObject({
      order: { occurredAt: 'DESC' },
      take: 50
    });
    expect(args.where).toMatchObject({ severity: AlertSeverity.CRITICAL });

    const statusFilter = (args.where as any).status as ReturnType<typeof In>;
    expect(statusFilter).toBeDefined();
    expect(statusFilter).toMatchObject({
      _type: 'in',
      _value: [AlertStatus.OPEN, AlertStatus.ACKNOWLEDGED]
    });
  });

  it('uses text search across title, siteName and type', async () => {
    repository.find.mockResolvedValue([]);

    await service.findAll({
      search: 'Perimeter',
      severity: AlertSeverity.HIGH,
      limit: 10
    });

    expect(repository.find).toHaveBeenCalledTimes(1);
    const args = repository.find.mock.calls[0][0];
    expect(args).toMatchObject({
      order: { occurredAt: 'DESC' },
      take: 10
    });

    expect(Array.isArray(args.where)).toBe(true);
    const predicates = args.where as Array<Record<string, unknown>>;
    predicates.forEach((predicate) => {
      expect(predicate).toMatchObject({ severity: AlertSeverity.HIGH });
      const searchable = predicate.title ?? predicate.siteName ?? predicate.type;
      expect(searchable).toBeDefined();
      expect(searchable).toBeInstanceOf(ILike('').constructor);
    });
  });

  it('returns all alerts when no filters provided', async () => {
    repository.find.mockResolvedValue([]);

    await service.findAll({});

    expect(repository.find).toHaveBeenCalledWith({
      where: {},
      order: { occurredAt: 'DESC' },
      take: 50
    });
  });
});
