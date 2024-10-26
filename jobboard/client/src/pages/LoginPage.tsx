import { useState } from 'react';
import { login } from '../lib/auth';
import type { User } from '../lib/types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const user = await login(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="" className="label">
          Email
        </label>
        <div className="control">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="input"
            value={email}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="" className="label">
          Password
        </label>
        <div className="control">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            className="input"
          />
        </div>
      </div>
      {error && (
        <div className="message is-danger">
          <p className="message-body">Login failed</p>
        </div>
      )}
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
