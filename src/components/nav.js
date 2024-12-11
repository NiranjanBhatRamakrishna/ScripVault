import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#333', color: '#fff' }}>
      <div>
        <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
        {isAuthenticated && (
          <Link to="/dashboard" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        )}
      </div>
      <div>
        {!isAuthenticated ? (
          <Link to="/login" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Login</Link>
        ) : (
          <button onClick={onLogout} style={{ margin: '0 10px', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
