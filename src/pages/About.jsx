import React from 'react';
import { Target, Layers, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page container">
      <div className="page-header">
        <h1 className="page-title">About Placement Preparation Portal</h1>
        <p className="page-subtitle">
          An initial-stage frontend prototype developed for college project presentation.
        </p>
      </div>

      <div className="about-grid">
        {/* Card 1: What is the Portal */}
        <div className="about-card">
          <div className="about-icon-box">
            <BookOpen size={24} />
          </div>
          <h3>What is the Placement Preparation Portal?</h3>
          <p>
            The Placement Preparation Portal (PrepPath) is an integrated student platform designed to streamline campus placement preparation. It brings together aptitude tests, core technical subject revisions, coding challenges, and interview preparation into a single organized hub.
          </p>
        </div>

        {/* Card 2: Why Useful */}
        <div className="about-card">
          <div className="about-icon-box">
            <Layers size={24} />
          </div>
          <h3>Why is it useful for students?</h3>
          <p>
            College placement rounds evaluate candidates across multiple skills—from quick quantitative calculations to data structures and core CS theory. This portal offers structured categories and progress tracking, saving students time and providing a focused path to interview readiness.
          </p>
        </div>

        {/* Card 3: Main Objectives */}
        <div className="about-card">
          <div className="about-icon-box">
            <Target size={24} />
          </div>
          <h3>Main Objectives</h3>
          <ul className="about-list">
            <li>Provide topic-wise practice modules for Aptitude and CS Fundamentals.</li>
            <li>Offer an interactive coding practice workspace for Data Structures and Algorithms.</li>
            <li>Help students monitor overall preparation progress through a centralized dashboard.</li>
            <li>Establish a scalable web app foundation for future backend integration.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
