import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { colors } from '../../tokens/colors';

const Container = styled.section`
  background: ${colors.surface};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${colors.overlays.shadowStrong};
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${colors.text.primary};
`;

interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Card = ({ title, action, children }: CardProps) => (
  <Container>
    {(title || action) && (
      <Header>
        <h2 style={{ margin: 0, fontSize: '1.1rem', color: colors.text.primary }}>{title}</h2>
        {action}
      </Header>
    )}
    {children}
  </Container>
);
