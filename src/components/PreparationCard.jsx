import React from 'react';
import Button from './Button';
import ProgressBar from './ProgressBar';
import { ArrowRight } from 'lucide-react';

export default function PreparationCard({
  icon: Icon,
  title,
  description,
  progress = 0,
  onStart,
  buttonText = "Start Practice",
  badgeText = ""
}) {
  return (
    <div className="prep-card">
      <div className="prep-card-header">
        <div className="prep-card-icon">
          {Icon && <Icon size={26} />}
        </div>
        {badgeText && <span className="prep-card-badge">{badgeText}</span>}
      </div>

      <div className="prep-card-body">
        <h3 className="prep-card-title">{title}</h3>
        <p className="prep-card-description">{description}</p>
        
        <div className="prep-card-progress">
          <ProgressBar percentage={progress} label="Module Progress" />
        </div>
      </div>

      <div className="prep-card-footer">
        <Button variant="primary" size="md" onClick={onStart} style={{ width: '100%' }}>
          {buttonText} <ArrowRight size={16} style={{ marginLeft: '6px' }} />
        </Button>
      </div>
    </div>
  );
}
