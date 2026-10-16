import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Cpu, Code2, Users } from 'lucide-react';
import PreparationCard from '../components/PreparationCard';

export default function Preparation() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "aptitude",
      icon: Calculator,
      title: "Aptitude",
      description: "Quantitative mathematics, logical reasoning, and verbal aptitude tests for company preliminary rounds.",
      progress: 40,
      badgeText: "Topic Wise",
      onStart: () => navigate('/aptitude')
    },
    {
      id: "technical",
      icon: Cpu,
      title: "Technical",
      description: "Fundamental CS concepts including Database Management (DBMS), Operating Systems, and Networking.",
      progress: 30,
      badgeText: "Core CS",
      onStart: () => navigate('/dashboard')
    },
    {
      id: "coding",
      icon: Code2,
      title: "Coding",
      description: "Data Structures & Algorithms problem sets with interactive solution environment.",
      progress: 25,
      badgeText: "Interactive",
      onStart: () => navigate('/coding')
    },
    {
      id: "interview",
      icon: Users,
      title: "Interview",
      description: "Behavioral interview questions, HR round tips, and technical discussion guides.",
      progress: 20,
      badgeText: "HR & Tech",
      onStart: () => navigate('/about')
    }
  ];

  return (
    <div className="preparation-page container">
      <div className="page-header">
        <h1 className="page-title">Preparation Modules</h1>
        <p className="page-subtitle">
          Select a category to practice questions, revise concepts, or solve coding challenges.
        </p>
      </div>

      <div className="prep-categories-grid">
        {categories.map((cat) => (
          <PreparationCard
            key={cat.id}
            icon={cat.icon}
            title={cat.title}
            description={cat.description}
            progress={cat.progress}
            badgeText={cat.badgeText}
            onStart={cat.onStart}
            buttonText={`Start ${cat.title}`}
          />
        ))}
      </div>
    </div>
  );
}
