import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
        <Link to="/" className="brand">PrepPath</Link>
        <nav>
          <Link to="/preparation">Preparation</Link>
          <Link to="/aptitude">Aptitude</Link>
          <Link to="/coding">Coding</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </nav>
        <div>
          {user ? (
            <>Hi, {user} | <button onClick={handleLogout}>Logout</button></>
          ) : (
            <><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>
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

      {/* Footer (plain <a> because practicals.html is not part of React) */}
      <footer>
        <p>PrepPath - Placement Preparation Portal | <a href="/practicals.html">Practicals demo page</a></p>
      </footer>
    </BrowserRouter>
  );
}
