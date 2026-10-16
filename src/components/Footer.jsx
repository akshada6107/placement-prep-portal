import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container footer-inner">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <GraduationCap size={22} className="footer-brand-icon" />
            <span className="footer-title">PrepPath</span>
          </div>
          <p className="footer-description">
            Placement Preparation Portal — Clean frontend prototype built for academic project presentation.
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Project</Link></li>
            <li><Link to="/preparation">Preparation Modules</Link></li>
            <li><Link to="/dashboard">Student Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Practice Sections</h4>
          <ul className="footer-links">
            <li><Link to="/aptitude">Quantitative Aptitude</Link></li>
            <li><Link to="/coding">Coding Practice</Link></li>
            <li><Link to="/preparation">Technical Core CS</Link></li>
            <li><Link to="/preparation">Mock Interviews</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Placement Preparation Portal (PrepPath).</p>
        </div>
      </div>
    </footer>
  );
}
