import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Award, ArrowRight, PlayCircle } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { getProgress } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [progress, setProgress] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProgress()
      .then((res) => setProgress(res.data))
      .catch((err) => console.error('Failed to load progress', err));
  }, []);

  const prog = progress || {
    aptitude: 0,
    technical: 0,
    coding: 0,
    interview: 0,
    testsCompleted: 0,
  };

  // Overall = average of the 4 categories
  const overallScore = Math.round(
    (prog.aptitude + prog.technical + prog.coding + prog.interview) / 4
  );

  return (
    <div className="dashboard-page container">

      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome, {user?.name || 'Student'} 👋
        </h1>
        <p className="dashboard-subtitle">
          Track your preparation progress below.
        </p>
      </div>

      {/* Overall Progress Card */}
      <div className="dashboard-overall-card">
        <div className="overall-header">
          <div>
            <h3>Overall Preparation Progress</h3>
            <p>Average of Aptitude, Technical, Coding and Interview scores</p>
          </div>
          <div className="overall-score-badge">{overallScore}%</div>
        </div>

        <ProgressBar
          percentage={overallScore}
          height="12px"
          color="var(--primary-color)"
          showPercentText={false}
        />

        {/* Individual category bars */}
        <div className="category-progress-grid">
          <div className="category-item">
            <ProgressBar label="Aptitude" percentage={prog.aptitude} color="#0f766e" />
          </div>
          <div className="category-item">
            <ProgressBar label="Technical" percentage={prog.technical} color="#0d9488" />
          </div>
          <div className="category-item">
            <ProgressBar label="Coding" percentage={prog.coding} color="#d97706" />
          </div>
          <div className="category-item">
            <ProgressBar label="Interview" percentage={prog.interview} color="#475569" />
          </div>
        </div>
      </div>

      {/* 2 Real Stat Cards */}
      <div className="stat-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-blue">
            <CheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{prog.testsCompleted}</span>
            <span className="stat-label">Aptitude Tests Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-green">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{prog.aptitude}%</span>
            <span className="stat-label">Latest Aptitude Score</span>
          </div>
        </div>
      </div>

      {/* Continue Preparation — Aptitude only */}
      <div className="continue-section">
        <div className="section-header">
          <h2 className="section-title">Continue Preparation</h2>
          <p className="section-subtitle">Practice aptitude questions and track your score.</p>
        </div>

        <div className="continue-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="continue-card">
            <div className="continue-card-top">
              <div className="continue-card-icon">
                <PlayCircle size={20} />
              </div>
              <div>
                <h4 className="continue-card-title">Quantitative Aptitude</h4>
                <span className="continue-card-sub">Speed, Time &amp; Distance · Logical Reasoning</span>
              </div>
            </div>

            <div className="continue-card-progress">
              <ProgressBar label="Your Score" percentage={prog.aptitude} height="6px" />
            </div>

            <div className="continue-card-action">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/aptitude')}
                style={{ width: '100%' }}
              >
                Start / Retry Practice <ArrowRight size={14} style={{ marginLeft: '6px' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
