import styled from '@emotion/styled';

import { AlertStatus } from '../../types/alerts';
import { colors } from '../tokens/colors';

const Badge = styled.span<{ $status: AlertStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${colors.text.inverse};
  background: ${({ $status }) => colors.status[$status]};
  text-transform: capitalize;
`;

export interface StatusBadgeProps {
  status: AlertStatus;
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return <Badge $status={status}>{label ?? status}</Badge>;
};
