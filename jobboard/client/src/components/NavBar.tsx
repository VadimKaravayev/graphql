import { Link } from 'react-router-dom';
import type { User } from '../lib/types';
import { logout } from '../lib/auth';

interface NavBarProps {
  user: User | null;
  onLogout: () => void;
}

function NavBar({ user, onLogout }: NavBarProps) {
  const loggedIn = Boolean(user);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>
      {loggedIn ? (
        <div className="navbar-end">
          <span className="navbar-item has-text-grey">{user?.email}</span>
          <Link className="navbar-item" to="/jobs/new">
            Post Job
          </Link>
          <a onClick={handleLogout} className="navbar-item">
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar-end">
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
