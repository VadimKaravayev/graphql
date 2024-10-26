import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/graphql/client';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { getUser, logout } from './lib/auth';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User>(getUser());

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <header>
        <NavBar user={user} onLogout={handleLogout} />
      </header>
      <main>
        {user ? <Chat user={user} /> : <LoginForm onLogin={setUser} />}
      </main>
    </ApolloProvider>
  );
}

export default App;
