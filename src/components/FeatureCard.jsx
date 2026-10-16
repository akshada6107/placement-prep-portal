import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ icon: Icon, title, description, linkTo = "/preparation", linkText = "Explore" }) {
  return (
    <div className="feature-card">
      <div className="feature-card-icon-box">
        {Icon && <Icon size={24} className="feature-card-icon" />}
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
      {linkTo && (
        <Link to={linkTo} className="feature-card-link">
          <span>{linkText}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
