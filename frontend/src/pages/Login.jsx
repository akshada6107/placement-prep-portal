import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../api';

// Login page: calls POST /api/login, saves the token, tells App who is logged in
// Props: onLogin (function from App.jsx)
export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) return setError('Enter username and password');
    try {
      const data = await post('/api/login', { username, password });
      onLogin(data.username, data.token); // App saves them in state + localStorage
      navigate('/dashboard');
    } catch (err) {
      setError(err.message); // e.g. "Wrong username or password"
    }
  }

  return (
    <section>
      <form className="card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input id="username" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
