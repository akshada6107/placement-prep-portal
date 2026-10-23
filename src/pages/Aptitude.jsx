import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAptitudeQuestions, submitAptitude } from '../api';

export default function Aptitude() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const totalQuestions = questions.length;

  const { token } = useContext(AuthContext);
  const currentQ = questions[currentIndex];

  // Load questions from backend
  useEffect(() => {
    getAptitudeQuestions()
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Failed to load aptitude questions', err));
  }, []);

  const handleSelectOption = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [submissionResult, setSubmissionResult] = useState(null);
  const [score, setScore] = useState(null);       // percentage e.g. 60
  const [correctCount, setCorrectCount] = useState(null); // e.g. 3

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      alert('You must be logged in to submit the test');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data } = await submitAptitude(
        Object.entries(userAnswers).map(([qid, ans]) => ({
          questionId: parseInt(qid) + 1,
          selectedOption: ans,
        })),
      );
      setScore(data.score);               // percentage
      setCorrectCount(data.correct);       // number of correct answers
      setSubmissionResult(data.gradedAnswers);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submit error', err);
      const msg = err.response?.data?.message || 'Submission failed';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  // Show loading state while questions are being fetched
  if (questions.length === 0) {
    return (
      <div className="aptitude-page container">
        <p>Loading aptitude questions...</p>
      </div>
    );
  }

  // Use the score returned from the server
  const calculateScore = () => correctCount !== null ? correctCount : 0;

// Render analysis after submission
const renderAnalysis = () => (
  <div className="analysis-section">
    <h3>Answer Analysis</h3>
    {submissionResult && submissionResult.map((ans) => {
      const q = questions.find((qt) => qt.id === ans.questionId);
      return (
        <div key={ans.questionId} className="analysis-item">
          <p className="analysis-question"><strong>Q:</strong> {q?.question}</p>
          <p className="analysis-your"><strong>Your answer:</strong> {q?.options[ans.selectedOption]}</p>
          <p className="analysis-correct"><strong>Correct answer:</strong> {q?.options[ans.correctOption]}</p>
          <p className="analysis-explanation"><em>{ans.explanation}</em></p>
          <hr />
        </div>
      );
    })}
  </div>
);

  return (
    <div className="aptitude-page container">
      {/* Top Header */}
      <div className="aptitude-header">
        <button className="back-btn" onClick={() => navigate('/preparation')}>
          <ArrowLeft size={18} /> Back to Modules
        </button>
        <span className="module-badge">{currentQ?.category || "Quantitative Aptitude"}</span>
      </div>

      {isSubmitted ? (
        <div className="aptitude-results-card">
          <div className="results-icon">
            <CheckCircle2 size={48} />
          </div>
          <h2>Practice Test Complete!</h2>
          <p className="results-subtitle">You have answered all practice questions.</p>
          
          <div className="score-box">
            <span className="score-label">Your Score</span>
            <span className="score-value">{calculateScore()} / {totalQuestions}</span>
            <span className="score-percentage">
              ({score !== null ? score : 0}%)
            </span>
          </div>

          <div className="results-actions">
            <Button variant="primary" onClick={handleReset}>
              <RotateCcw size={16} style={{ marginRight: '6px' }} /> Retry Test
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <div className="aptitude-question-card">
          {/* Question Header & Counter */}
          <div className="question-card-header">
            <h1 className="aptitude-title">{currentQ.category}</h1>
            <span className="question-counter">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Question Text */}
          <div className="question-body">
            <p className="question-text">{currentQ.question}</p>

            {/* Options List */}
            <div className="options-group">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`option-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(idx)}
                  >
                    <span className="radio-circle">
                      {isSelected && <span className="radio-inner" />}
                    </span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="question-card-footer">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous
            </Button>

            {currentIndex === totalQuestions - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(userAnswers).length === 0}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Practice'}
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Next <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
