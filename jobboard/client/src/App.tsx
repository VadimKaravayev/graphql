import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getUser } from './lib/auth';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import JobPage from './pages/JobPage';
import CompanyPage from './pages/CompanyPage';
import CreateJobPage from './pages/CreateJobPage';
import LoginPage from './pages/LoginPage';
import type { User } from './lib/types';
import { apolloClient } from './lib/graphql/queries';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getUser());

  const handleLogin = (user: User) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <ApolloProvider client={apolloClient}>
      <NavBar user={user} onLogout={handleLogout} />
      <main className="section">
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/jobs/:jobId" element={<JobPage />} />
          <Route path="/company/:companyId" element={<CompanyPage />} />
          <Route path="/jobs/new" element={<CreateJobPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
