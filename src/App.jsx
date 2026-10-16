import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Preparation from './pages/Preparation';
import Aptitude from './pages/Aptitude';
import Coding from './pages/Coding';
import ProblemDetails from './pages/ProblemDetails';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/aptitude" element={<Aptitude />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/coding/problem" element={<ProblemDetails />} />
            <Route path="/coding/problem/:slug" element={<ProblemDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
