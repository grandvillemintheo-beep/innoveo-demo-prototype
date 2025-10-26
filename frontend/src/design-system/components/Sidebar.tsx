import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

import { colors } from '../tokens/colors';

type SidebarItem = {
  id: string;
  label: string;
  href: string;
};

interface SidebarProps {
  items: SidebarItem[];
}

const Container = styled.aside`
  background: ${colors.roles.security};
  color: ${colors.text.inverse};
  padding: 24px 16px;
`;

const Brand = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 32px;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLink = styled(NavLink)`
  color: inherit;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const Sidebar = ({ items }: SidebarProps) => (
  <Container>
    <Brand>Innoveo</Brand>
    <NavList>
      {items.map((item) => (
        <StyledLink key={item.id} to={item.href} end>
          {item.label}
        </StyledLink>
      ))}
    </NavList>
  </Container>
);
