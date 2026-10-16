import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code2 } from 'lucide-react';

export default function ProblemCard({ problem }) {
  const getDifficultyClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'badge-easy';
      case 'medium': return 'badge-medium';
      case 'hard': return 'badge-hard';
      default: return 'badge-default';
    }
  };

  return (
    <Link to={`/coding/problem/${problem.slug}`} className="problem-card">
      <div className="problem-card-left">
        <div className="problem-icon">
          <Code2 size={18} />
        </div>
        <div>
          <h4 className="problem-title">{problem.title}</h4>
          <div className="problem-tags">
            {problem.tags && problem.tags.map((tag, idx) => (
              <span key={idx} className="problem-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="problem-card-right">
        <span className={`difficulty-badge ${getDifficultyClass(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
        <div className="problem-action-btn">
          <span>Solve</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
}
