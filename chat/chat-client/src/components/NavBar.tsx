import type { User } from '../types';

type NavBarProps = {
  user: User;
  onLogout: () => void;
};

function NavBar({ user, onLogout }: NavBarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <p className="navbar-item is-size-5 has-text weight-bold has-text-dark">
          GraphQL Chat
        </p>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="navbar-item">
            <button className="button is-link" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
