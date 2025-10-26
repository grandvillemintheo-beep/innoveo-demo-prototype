import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { SeverityBadge } from '../design-system/components/SeverityBadge';
import { StatusBadge } from '../design-system/components/StatusBadge';
import { Card } from '../design-system/components/controls/Card';
import { colors } from '../design-system/tokens/colors';
import { useAuth } from '../hooks/useAuth';
import { fetchAlerts } from '../services/alerts.service';
import { AlertDto, AlertSeverity, AlertStatus } from '../types/alerts';

type SeverityFilter = AlertSeverity | 'all';

const severityOrder: AlertSeverity[] = ['critical', 'high', 'medium', 'low'];
const statusOrder: AlertStatus[] = ['open', 'acknowledged', 'resolved'];

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${colors.text.muted};
`;

const SeveritySelect = styled.select`
  min-width: 180px;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  padding: 10px 14px;
  font-size: 0.95rem;
  background: ${colors.surface};
  color: ${colors.text.primary};
`;

const StatusToggleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatusToggle = styled.button<{ $active: boolean }>`
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? colors.roles.security : colors.border)};
  background: ${({ $active }) => ($active ? 'rgba(15, 76, 129, 0.12)' : colors.surface)};
  color: ${({ $active }) => ($active ? colors.roles.security : colors.text.secondary)};
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${colors.roles.security};
  }
`;

const ShortcutHint = styled.span`
  font-size: 0.78rem;
  color: ${colors.text.muted};
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ShortcutKey = styled.kbd`
  background: rgba(15, 76, 129, 0.08);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  border: 1px solid rgba(15, 76, 129, 0.16);
  font-family: inherit;
  color: ${colors.text.primary};
`;

const SummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SummaryChip = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? colors.roles.security : 'transparent')};
  background: ${({ $active }) => ($active ? 'rgba(15, 76, 129, 0.12)' : 'rgba(15, 76, 129, 0.05)')};
  font-weight: 600;
  color: ${colors.text.primary};
`;

const AlertsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

const HeaderCell = styled.th`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 8px 0;
  color: ${colors.text.muted};
  border-bottom: 1px solid ${colors.border};
`;

const Row = styled.tr`
  &:not(:last-of-type) td {
    border-bottom: 1px solid rgba(15, 76, 129, 0.08);
  }
`;

const Cell = styled.td`
  padding: 12px 0;
  vertical-align: top;
  color: ${colors.text.primary};
`;

const AlertTitle = styled.span`
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
`;

const AlertMeta = styled.span`
  font-size: 0.78rem;
  color: ${colors.text.muted};
`;

const StateMessage = styled.p<{ $variant?: 'error' | 'muted' }>`
  margin: 16px 0 0;
  color: ${({ $variant }) => {
    if ($variant === 'error') {
      return colors.severity.critical;
    }
    if ($variant === 'muted') {
      return colors.text.muted;
    }
    return colors.text.secondary;
  }};
`;

export const DashboardPage = () => {
  const { t, i18n } = useTranslation('dashboard');
  const { user, accessToken } = useAuth();
  const [severity, setSeverity] = useState<SeverityFilter>('critical');
  const [selectedStatuses, setSelectedStatuses] = useState<Set<AlertStatus>>(
    new Set<AlertStatus>(['open', 'acknowledged'])
  );
  const [alerts, setAlerts] = useState<AlertDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const selectedStatusesArray = useMemo(
    () => Array.from(selectedStatuses).sort() as AlertStatus[],
    [selectedStatuses]
  );

  const severityDistribution = useMemo(() => {
    return alerts.reduce(
      (acc, alert) => {
        acc[alert.severity] = (acc[alert.severity] ?? 0) + 1;
        return acc;
      },
      {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      } as Record<AlertSeverity, number>
    );
  }, [alerts]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'short',
        timeStyle: 'short'
      }),
    [i18n.language]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) {
        return;
      }

      const mapping: Record<string, SeverityFilter> = {
        '0': 'all',
        '1': 'critical',
        '2': 'high',
        '3': 'medium',
        '4': 'low'
      };

      const target = mapping[event.key];
      if (!target) {
        return;
      }

      event.preventDefault();
      setSeverity(target);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setAlerts([]);
      setLastUpdated(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    if (selectedStatusesArray.length === 0) {
      setAlerts([]);
      setLastUpdated(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const severityFilter = severity === 'all' ? undefined : severity;

    fetchAlerts({
      token: accessToken,
      severity: severityFilter,
      statuses: selectedStatusesArray,
      limit: 20
    })
      .then((payload) => {
        if (cancelled) {
          return;
        }
        setAlerts(payload);
        setLastUpdated(new Date());
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        console.error('Failed to load alerts', err);
        setError(t('alerts.error'));
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, severity, selectedStatusesArray, t]);

  const statusLabels = useMemo(
    () =>
      statusOrder.reduce(
        (acc, status) => ({
          ...acc,
          [status]: t(`alerts.statuses.${status}`)
        }),
        {} as Record<AlertStatus, string>
      ),
    [t]
  );

  const severityLabels = useMemo(
    () =>
      severityOrder.reduce(
        (acc, level) => ({
          ...acc,
          [level]: t(`alerts.severity.${level}`)
        }),
        {} as Record<AlertSeverity, string>
      ),
    [t]
  );

  const severityOptions = useMemo(
    () =>
      (['all', ...severityOrder] as SeverityFilter[]).map((value) => ({
        value,
        label: t(`alerts.severity.${value}`)
      })),
    [t]
  );

  const lastUpdatedLabel = useMemo(() => {
    if (!lastUpdated) {
      return null;
    }
    return t('alerts.lastRefresh', { time: dateFormatter.format(lastUpdated) });
  }, [lastUpdated, dateFormatter, t]);

  const renderAlertRows = () => {
    return alerts.map((alert) => (
      <Row key={alert.id}>
        <Cell>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <SeverityBadge severity={alert.severity} label={severityLabels[alert.severity]} />
            <div>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertMeta>
                {alert.type}
                {alert.sourceSystem ? ` · ${alert.sourceSystem}` : ''}
              </AlertMeta>
            </div>
          </div>
        </Cell>
        <Cell>
          <AlertMeta>{alert.siteName}</AlertMeta>
        </Cell>
        <Cell>
          <StatusBadge status={alert.status} label={statusLabels[alert.status]} />
        </Cell>
        <Cell>
          <AlertMeta>{dateFormatter.format(new Date(alert.occurredAt))}</AlertMeta>
        </Cell>
      </Row>
    ));
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Card title={t('overview.title')}>
        <p>{t('overview.subtitle', { name: user?.displayName ?? user?.email ?? 'Guest' })}</p>
        <ul>
          <li>{t('overview.items.security')}</li>
          <li>{t('overview.items.business')}</li>
          <li>{t('overview.items.experience')}</li>
        </ul>
      </Card>

      <Card title={t('alerts.title')} action={lastUpdatedLabel ? <span>{lastUpdatedLabel}</span> : undefined}>
        <FiltersRow>
          <FilterGroup>
            <FilterLabel>{t('alerts.filters.severity')}</FilterLabel>
            <SeveritySelect value={severity} onChange={(event) => setSeverity(event.target.value as SeverityFilter)}>
              {severityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SeveritySelect>
          </FilterGroup>

          <FilterGroup style={{ flex: 1 }}>
            <FilterLabel>{t('alerts.filters.status')}</FilterLabel>
            <StatusToggleGroup>
              {statusOrder.map((status) => {
                const active = selectedStatuses.has(status);
                return (
                  <StatusToggle
                    key={status}
                    $active={active}
                    type="button"
                    onClick={() => {
                      setSelectedStatuses((previous) => {
                        const next = new Set(previous);
                        if (next.has(status)) {
                          next.delete(status);
                        } else {
                          next.add(status);
                        }
                        return next;
                      });
                    }}
                  >
                    {statusLabels[status]}
                  </StatusToggle>
                );
              })}
            </StatusToggleGroup>
          </FilterGroup>

          <ShortcutHint>
            {t('alerts.filters.shortcuts')}
            <span>
              <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>1</ShortcutKey> ({t('alerts.severity.critical')})
            </span>
            <span>
              <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>2</ShortcutKey> ({t('alerts.severity.high')})
            </span>
            <span>
              <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>3</ShortcutKey> ({t('alerts.severity.medium')})
            </span>
            <span>
              <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>4</ShortcutKey> ({t('alerts.severity.low')})
            </span>
            <span>
              <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>0</ShortcutKey> ({t('alerts.severity.all')})
            </span>
          </ShortcutHint>
        </FiltersRow>

        <SummaryRow>
          {severityOrder.map((level) => (
            <SummaryChip key={level} $active={severity === level}>
              <SeverityBadge severity={level} label={severityLabels[level]} />
              <span>{severityDistribution[level]}</span>
            </SummaryChip>
          ))}
        </SummaryRow>

        {isLoading ? (
          <StateMessage>{t('alerts.loading')}</StateMessage>
        ) : error ? (
          <StateMessage $variant="error">{error}</StateMessage>
        ) : alerts.length === 0 ? (
          <StateMessage $variant="muted">
            {selectedStatusesArray.length === 0 ? t('alerts.filters.emptyStatuses') : t('alerts.empty')}
          </StateMessage>
        ) : (
          <AlertsTable>
            <thead>
              <tr>
                <HeaderCell>{t('alerts.columns.alert')}</HeaderCell>
                <HeaderCell>{t('alerts.columns.site')}</HeaderCell>
                <HeaderCell>{t('alerts.columns.status')}</HeaderCell>
                <HeaderCell>{t('alerts.columns.time')}</HeaderCell>
              </tr>
            </thead>
            <tbody>{renderAlertRows()}</tbody>
          </AlertsTable>
        )}
      </Card>

      <Card title={t('insights.title')}>
        <p>{t('insights.description')}</p>
      </Card>
    </div>
  );
};
