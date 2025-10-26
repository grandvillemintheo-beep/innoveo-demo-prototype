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
  const { login, mfaRequired, verifyOtp, pendingEmail, challengeId, stage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsVerifying(true);
    try {
      await verifyOtp(otp);
      navigate(from, { replace: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsVerifying(false);
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
              autoComplete="email"
              disabled={isSubmitting || stage === 'authenticating'}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={isSubmitting || stage === 'authenticating'}
            />
            <Button type="submit" disabled={isSubmitting || stage === 'authenticating'}>
              {isSubmitting || stage === 'authenticating' ? 'Connexion…' : 'Continuer'}
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleVerify}>
            {pendingEmail ? (
              <p style={{ color: '#0f4c81', margin: 0 }}>
                Code envoyé à <strong>{pendingEmail}</strong>
                {challengeId ? (
                  <>
                    {' '}
                    (challenge <code>{challengeId}</code>)
                  </>
                ) : null}
              </p>
            ) : (
              <p style={{ color: '#0f4c81', margin: 0 }}>
                Saisissez le code MFA reçu sur votre canal sécurisé.
              </p>
            )}
            <Input
              type="text"
              placeholder="Code MFA (000000)"
              required
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              autoComplete="one-time-code"
              disabled={isVerifying}
            />
            <Button type="submit" disabled={isVerifying}>
              {isVerifying ? 'Vérification…' : 'Vérifier'}
            </Button>
          </Form>
        )}
        {error ? <p style={{ color: 'tomato' }}>{error}</p> : null}
      </Card>
    </div>
  );
};
