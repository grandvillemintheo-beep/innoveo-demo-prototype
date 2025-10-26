export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export interface AlertDto {
  id: string;
  title: string;
  type: string;
  severity: AlertSeverity;
  status: AlertStatus;
  occurredAt: string;
  siteId: string;
  siteName: string;
  sourceSystem?: string | null;
  metadata?: Record<string, unknown> | null;
}
