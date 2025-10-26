import { FormEvent, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Button } from '../design-system/components/controls/Button';
import { Card } from '../design-system/components/controls/Card';
import { useAuth } from '../hooks/useAuth';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  border: 1px solid rgba(15, 76, 129, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 1rem;
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, mfaRequired, verifyOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await verifyOtp(otp);
      navigate(from, { replace: true });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100%' }}>
      <Card title={mfaRequired ? 'MFA' : 'Connexion'}>
        {!mfaRequired ? (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit">Continuer</Button>
          </Form>
        ) : (
          <Form onSubmit={handleVerify}>
            <Input
              type="text"
              placeholder="Code MFA (000000)"
              required
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
            <Button type="submit">Vérifier</Button>
          </Form>
        )}
        {error ? <p style={{ color: 'tomato' }}>{error}</p> : null}
      </Card>
    </div>
  );
};
