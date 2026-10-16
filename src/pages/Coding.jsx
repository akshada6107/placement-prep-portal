import React, { useState, useEffect } from 'react';
import ProblemCard from '../components/ProblemCard';
import { Search, Filter, Code2 } from 'lucide-react';
import { getCodingProblems, submitCode } from '../api';

export default function Coding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  // Load problems from backend
  useEffect(() => {
    getCodingProblems()
      .then(res => setProblems(res.data))
      .catch(err => console.error('Failed to load coding problems', err));
  }, []);

  // Filter problems based on search query and difficulty filter
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty =
      selectedDifficulty === 'All' ||
      problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="coding-page container">
      <div className="page-header">
        <h1 className="page-title">Coding Practice Problems</h1>
        <p className="page-subtitle">
          Practice data structures and algorithms with our curated list of interview problems.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="coding-controls">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search problems by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="difficulty-filter-wrapper">
          <Filter size={16} className="filter-icon" />
          <span className="filter-label">Difficulty:</span>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              type="button"
              className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problem List */}
      <div className="problems-container">
        {filteredProblems.length > 0 ? (
          <div className="problems-list">
            {filteredProblems.map((problem) => (
              <div key={problem.id} onClick={() => setSelectedProblem(problem)} style={{ cursor: 'pointer' }}>
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Code2 size={40} className="empty-icon" />
            <h3>No problems found</h3>
            <p>Try adjusting your search query or difficulty filter.</p>
          </div>
        )}
        {/* Submission UI */}
        {selectedProblem && (
          <div className="submission-panel" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>{selectedProblem.title} - Submit Solution</h3>
            <textarea
              rows={8}
              style={{ width: '100%', marginBottom: '0.5rem' }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
            <button
              onClick={async () => {
                try {
                  const { data } = await submitCode({ problemId: selectedProblem.id, code, language: 'javascript' });
                  setSubmissionResult(data);
                } catch (err) {
                  console.error('Submit error', err);
                  alert('Submission failed');
                }
              }}
              style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              Submit
            </button>
            {submissionResult && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Result:</strong> {submissionResult.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
