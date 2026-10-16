import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Code2, Award, Flame, ArrowRight, PlayCircle } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { getProgress } from '../api';

export default function Dashboard() {
  const [progress, setProgress] = useState(null);

  // Load progress once when component mounts
  useEffect(() => {
    getProgress()
      .then((res) => setProgress(res.data))
      .catch((err) => console.error('Failed to load progress', err));
  }, []);

  const prog = progress || { aptitude: 0, technical: 0, coding: 0, interview: 0 };

  const continueItems = [
    {
      id: 1,
      title: "Quantitative Aptitude",
      subtitle: "Speed, Time & Distance",
      progress: prog.aptitude,
      link: "/aptitude",
      actionText: "Continue Practice",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      subtitle: "Binary Search & Array Problems",
      progress: prog.coding,
      link: "/coding",
      actionText: "Solve Problems",
    },
    {
      id: 3,
      title: "Technical Concepts",
      subtitle: "DBMS & SQL Query Fundamentals",
      progress: prog.technical,
      link: "/preparation",
      actionText: "Review Topics",
    },
  ];

  return (
    <div className="dashboard-page container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome, Student 👋</h1>
          <p className="dashboard-subtitle">Track your preparation metrics and upcoming goals.</p>
        </div>
      </div>

      {/* Main Overall Progress Banner */}
      <div className="dashboard-overall-card">
        <div className="overall-header">
          <div>
            <h3>Overall Preparation Progress</h3>
            <p>Calculated across all practice modules</p>
          </div>
          <div className="overall-score-badge">{Math.round((prog.aptitude + prog.technical + prog.coding + prog.interview) / 4)}%</div>
        </div>

        <ProgressBar
          percentage={Math.round((prog.aptitude + prog.technical + prog.coding + prog.interview) / 4)}
          height="12px"
          color="var(--primary-color)"
          showPercentText={false}
        />

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

      {/* 4 Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-blue">
            <CheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">Tests Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">
            <Code2 size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">28</span>
            <span className="stat-label">Coding Problems</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-green">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">78%</span>
            <span className="stat-label">Overall Score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-orange">
            <Flame size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5 Days</span>
            <span className="stat-label">Current Streak</span>
          </div>
        </div>
      </div>

      {/* Continue Preparation Section */}
      <div className="continue-section">
        <div className="section-header">
          <h2 className="section-title">Continue Preparation</h2>
          <p className="section-subtitle">Pick up where you left off in your recent practice sessions.</p>
        </div>

        <div className="continue-grid">
          {continueItems.map((item) => (
            <div key={item.id} className="continue-card">
              <div className="continue-card-top">
                <div className="continue-card-icon">
                  <PlayCircle size={20} />
                </div>
                <div>
                  <h4 className="continue-card-title">{item.title}</h4>
                  <span className="continue-card-sub">{item.subtitle}</span>
                </div>
              </div>

              <div className="continue-card-progress">
                <ProgressBar label="Progress" percentage={item.progress} height="6px" />
              </div>

              <div className="continue-card-action">
                <Button variant="outline" size="sm" onClick={() => navigate(item.link)} style={{ width: '100%' }}>
                  {item.actionText} <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
