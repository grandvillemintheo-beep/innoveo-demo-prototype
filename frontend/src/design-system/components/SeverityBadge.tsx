import styled from '@emotion/styled';

import { AlertSeverity } from '../../types/alerts';
import { colors } from '../tokens/colors';

const Badge = styled.span<{ $severity: AlertSeverity }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
  color: ${colors.text.inverse};
  background: ${({ $severity }) => colors.severity[$severity]};
  text-transform: capitalize;
`;

export interface SeverityBadgeProps {
  severity: AlertSeverity;
  label?: string;
}

export const SeverityBadge = ({ severity, label }: SeverityBadgeProps) => {
  return <Badge $severity={severity}>{label ?? severity}</Badge>;
};
