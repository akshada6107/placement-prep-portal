import React from 'react';

export default function ProgressBar({
  percentage = 0,
  label = '',
  showPercentText = true,
  height = '8px',
  color = 'var(--primary-color)'
}) {
  const safePercent = Math.min(100, Math.max(0, percentage));

  return (
    <div className="progress-bar-container">
      {(label || showPercentText) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}
          {showPercentText && <span className="progress-bar-value">{safePercent}%</span>}
        </div>
      )}
      <div className="progress-bar-track" style={{ height }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${safePercent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
