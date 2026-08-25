import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <Link to="/dashboard" className="brand">
        <span className="brand-icon">JSS</span>
        EventHub
      </Link>
      <div className="links">
        <span className="meta">Welcome, <strong>{user?.name}</strong></span>
        {user?.role === 'society' && (
          <Link to="/create-event" className={isActive('/create-event') ? 'active' : ''}>Create Event</Link>
        )}
        <Link to="/my-events" className={isActive('/my-events') ? 'active' : ''}>My Events</Link>
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
