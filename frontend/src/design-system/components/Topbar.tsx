import styled from '@emotion/styled';

import { colors } from '../tokens/colors';
import { Button } from './controls/Button';

interface TopbarProps {
  user: { displayName?: string | null; email?: string | null } | null;
  onLogout: () => void;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Identity = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Topbar = ({ user, onLogout }: TopbarProps) => (
  <Wrapper>
    <Identity>
      <span style={{ fontSize: '1rem', fontWeight: 600, color: colors.text.primary }}>Innoveo Experience</span>
      <span style={{ fontSize: '0.9rem', color: colors.text.secondary }}>
        {user ? `Bienvenue ${user.displayName ?? user.email ?? ''}` : 'Connexion requise'}
      </span>
    </Identity>
    {user ? <Button onClick={onLogout}>Déconnexion</Button> : null}
  </Wrapper>
);
