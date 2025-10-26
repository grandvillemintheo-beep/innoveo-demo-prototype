import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

const StyledButton = styled.button`
  background: linear-gradient(90deg, #0f4c81 0%, #1b98e0 100%);
  border: none;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 8px 20px rgba(11, 64, 156, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(11, 64, 156, 0.25);
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
