import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { GraduationCap, Menu, X, User } from 'lucide-react';
import Button from './Button';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, setUser, logout } = useContext(AuthContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-inner container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-logo-icon">
              <GraduationCap size={24} />
            </div>
            <div className="brand-text">
              <span className="brand-title">PrepPath</span>
              <span className="brand-tag">Placement Prep</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links desktop-only">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              About
            </NavLink>
            <NavLink to="/preparation" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Preparation
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Dashboard
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="navbar-actions desktop-only">
            {user ? (
              <div className="navbar-user-info">
                <span className="user-greeting">Hello, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} style={{ marginLeft: '8px' }}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsLoginModalOpen(true)}>
                  <User size={16} style={{ marginRight: '6px' }} /> Login
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsRegisterModalOpen(true)} style={{ marginLeft: '8px' }}>
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="mobile-menu-toggle mobile-only" onClick={toggleMobileMenu} aria-label="Toggle navigation">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu mobile-only">
            <NavLink to="/" end className="mobile-link" onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className="mobile-link" onClick={closeMobileMenu}>
              About
            </NavLink>
            <NavLink to="/preparation" className="mobile-link" onClick={closeMobileMenu}>
              Preparation
            </NavLink>
            <NavLink to="/dashboard" className="mobile-link" onClick={closeMobileMenu}>
              Dashboard
            </NavLink>
            <div className="mobile-actions">
              {user ? (
                <Button variant="primary" size="md" style={{ width: '100%' }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="primary" size="md" style={{ width: '100%' }} onClick={() => { closeMobileMenu(); setIsLoginModalOpen(true); }}>
                    Login
                  </Button>
                  <Button variant="secondary" size="md" style={{ width: '100%', marginTop: '8px' }} onClick={() => { closeMobileMenu(); setIsRegisterModalOpen(true); }}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
