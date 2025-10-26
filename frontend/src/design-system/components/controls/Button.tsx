import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

import { colors } from '../../tokens/colors';

const StyledButton = styled.button`
  background: linear-gradient(90deg, ${colors.brand.primary} 0%, ${colors.brand.secondary} 100%);
  border: none;
  color: ${colors.text.inverse};
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: ${colors.overlays.shadowSoft};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(15, 76, 129, 0.18);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};
