import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Import login from the mock service

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the mock login function
      const response = await login(email, password);
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      onLogin(); // Update parent state to indicate user is logged in
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (error) {
      alert(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
