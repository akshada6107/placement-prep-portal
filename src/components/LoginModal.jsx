import React, { useState, useContext } from 'react';
import { X, LogIn, Lock, Mail } from 'lucide-react';
import Button from './Button';
import { login } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { login: authLogin } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      // Store token and user via AuthContext
      authLogin(data.token, data.user);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <LogIn size={20} />
            </div>
            <h3>Student Login</h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-body modal-success">
            <div className="success-badge">✓</div>
            <h4>Prototype Notice</h4>
            <p>Authentication backend will be integrated in Phase 2.</p>
            <p className="subtext">Currently viewing demo student session.</p>
            <Button onClick={handleClose} variant="primary" style={{ marginTop: '1rem', width: '100%' }}>
              Continue as Demo Student
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            <p className="modal-subtitle">Enter your credentials to access your placement dashboard.</p>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <Button type="submit" variant="primary" style={{ width: '100%' }}>
                Log In
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
