import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calculator, Cpu, Code, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="badge-dot"></span> Student Placement Preparation Platform
          </div>
          <h1 className="hero-title">
            Prepare Better. <br />
            <span className="text-highlight">Get Placement Ready.</span>
          </h1>
          <p className="hero-description">
            Practice aptitude, technical concepts, coding and interview questions in one place.
          </p>
          <div className="hero-buttons">
            <Button variant="primary" size="lg" onClick={() => navigate('/preparation')}>
              Start Preparing <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/about')}>
              Explore Preparation
            </Button>
          </div>

          <div className="hero-quick-stats">
            <div className="stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>4 Preparation Modules</span>
            </div>
            <div className="stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>Curated Practice Sets</span>
            </div>
            <div className="stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>Track Preparation Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container" id="features">
        <div className="section-header">
          <h2 className="section-title">Core Preparation Features</h2>
          <p className="section-subtitle">
            Comprehensive learning modules designed to build skills step-by-step for placement drives.
          </p>
        </div>

        <div className="features-grid">
          <FeatureCard
            icon={Calculator}
            title="Aptitude Practice"
            description="Master quantitative aptitude, logical reasoning, and verbal ability with topic-wise test questions."
            linkTo="/aptitude"
            linkText="Try Aptitude"
          />
          <FeatureCard
            icon={Cpu}
            title="Technical Preparation"
            description="Review core CS subjects including Operating Systems, DBMS, Computer Networks, and OOP concepts."
            linkTo="/preparation"
            linkText="Review Technical"
          />
          <FeatureCard
            icon={Code}
            title="Coding Practice"
            description="Solve algorithmic problems ranging from arrays and strings to stacks, trees, and searching."
            linkTo="/coding"
            linkText="Solve Problems"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Mock Interviews"
            description="Prepare for technical and HR round interview questions with sample responses and tips."
            linkTo="/preparation"
            linkText="View Interview Prep"
          />
        </div>
      </section>

      {/* Banner / Call to Action */}
      <section className="cta-banner container">
        <div className="cta-inner">
          <div className="cta-content">
            <h3>Ready to test your readiness?</h3>
            <p>Access your student dashboard and start tracking your preparation progress today.</p>
          </div>
          <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
            Go to Student Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
}
