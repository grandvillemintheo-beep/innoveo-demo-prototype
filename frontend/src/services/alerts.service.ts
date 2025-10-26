import { apiClient } from './api-client';
import { AlertDto, AlertSeverity, AlertStatus } from '../types/alerts';

export interface FetchAlertsParams {
  token: string;
  severity?: AlertSeverity;
  statuses?: AlertStatus[];
  siteId?: string;
  search?: string;
  limit?: number;
}

export async function fetchAlerts({ token, ...query }: FetchAlertsParams) {
  const params = new URLSearchParams();

  if (query.severity) {
    params.set('severity', query.severity);
  }

  if (query.statuses && query.statuses.length > 0) {
    query.statuses.forEach((status) => params.append('statuses', status));
  }

  if (query.siteId) {
    params.set('siteId', query.siteId);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  if (typeof query.limit === 'number') {
    params.set('limit', query.limit.toString());
  }

  const searchParams = params.toString();

  return apiClient<AlertDto[]>(`/alerts${searchParams ? `?${searchParams}` : ''}`, {
    token
  });
}
