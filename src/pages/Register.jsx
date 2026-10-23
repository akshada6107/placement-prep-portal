import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../api';

// Validation limits (the server checks the same numbers)
const USER_MIN = 3;
const USER_MAX = 20;
const PASS_MIN = 6;

// Register page: form with validation, then calls POST /api/register
export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // runs when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    if (username.length < USER_MIN || username.length > USER_MAX) {
      return setError(`Username must be ${USER_MIN}-${USER_MAX} characters`);
    }
    if (password.length < PASS_MIN) {
      return setError(`Password must be at least ${PASS_MIN} characters`);
    }
    try {
      await post('/api/register', { username, password });
      navigate('/login'); // success: go to the login page
    } catch (err) {
      setError(err.message); // e.g. "Username already taken"
    }
  }

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </section>
  );
}
