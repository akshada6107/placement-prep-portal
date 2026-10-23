import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Preparation from './pages/Preparation';
import Aptitude from './pages/Aptitude';
import Coding from './pages/Coding';
import ProblemDetails from './pages/ProblemDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// App: the router + navbar + footer. Login state lives here and is passed down as props.
export default function App() {
  // starts from localStorage so the user stays logged in after a refresh
  const [user, setUser] = useState(localStorage.getItem('username'));

  // called by the Login page after a successful login
  function handleLogin(username, token) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUser(username);
  }

  // forget the token and username
  function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <BrowserRouter>
      {/* Navbar */}
      <header className="navbar">
        <Link to="/" className="brand"><img src="/logo.svg" alt="" width="32" height="32" />PrepPath</Link>
        <nav>
          <NavLink to="/preparation">Preparation</NavLink>
          <NavLink to="/aptitude">Aptitude</NavLink>
          <NavLink to="/coding">Coding</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="user">
          {user ? (
            <>Hi, {user} <button onClick={handleLogout}>Logout</button></>
          ) : (
            <><Link to="/login">Login</Link> <Link to="/register" className="btn">Register</Link></>
          )}
        </div>
      </header>

      {/* Page content: one route per page */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/aptitude" element={<Aptitude user={user} />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/coding/:id" element={<ProblemDetails />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2026 PrepPath · Built with React, Express and SQLite</p>
      </footer>
    </BrowserRouter>
  );
}
