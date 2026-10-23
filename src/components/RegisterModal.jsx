import React, { useState, useContext } from 'react';
import { X, UserPlus, Mail, Lock } from 'lucide-react';
import Button from './Button';
import { register } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function RegisterModal({ isOpen, onClose }) {
  const { login: authLogin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const { data } = await register({ name, email, password });
      authLogin(data.token, data.user);
      onClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <UserPlus size={20} />
            </div>
            <h3>Student Registration</h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <p className="modal-subtitle">Create your PrepPath account.</p>
          {errorMsg && (
            <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{errorMsg}</p>
          )}
          <div className="form-group">
            <label>Name</label>
            <div className="input-with-icon">
              <UserPlus size={18} className="input-icon" />
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
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
                minLength={6}
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Button
              type="submit"
              variant="primary"
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
