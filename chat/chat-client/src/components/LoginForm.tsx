import { useState, FormEvent } from 'react';
import { login } from '../lib/auth';
import type { User } from '../types';

type LoginFormProps = {
  onLogin: (user: User) => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const user = await login(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError(true);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-dark">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="" className="label has-text-dark">
              Username
            </label>
            <div className="control">
              <input
                type="text"
                required
                className="input has-background-white has-text-dark"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label has-text-dark">
              Password
            </label>
            <div className="control">
              <input
                type="password"
                required
                className="input has-background-white has-text-dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button className="button is-link">Login</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
