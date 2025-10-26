import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Container = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(15, 76, 129, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
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
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h2>
        {action}
      </Header>
    )}
    {children}
  </Container>
);
