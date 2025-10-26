import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Sidebar } from './Sidebar';
import { colors } from '../tokens/colors';

type SidebarItem = {
  id: string;
  label: string;
  href: string;
};

interface AppShellProps {
  sidebarItems: SidebarItem[];
  topbar: ReactNode;
  children: ReactNode;
}

const Shell = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 72px 1fr;
  min-height: 100vh;
`;

const TopbarSlot = styled.header`
  grid-column: 1 / span 2;
  background: ${colors.surface};
  border-bottom: 1px solid ${colors.border};
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.main`
  background: ${colors.background};
  padding: 32px;
`;

export const AppShell = ({ sidebarItems, topbar, children }: AppShellProps) => {
  return (
    <Shell>
      <TopbarSlot>{topbar}</TopbarSlot>
      <Sidebar items={sidebarItems} />
      <Content>{children}</Content>
    </Shell>
  );
};
