import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { codingProblems } from '../data/codingProblems';
import Button from '../components/Button';
import { ArrowLeft, Play, Send, Terminal, CheckCircle2 } from 'lucide-react';

export default function ProblemDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find problem by slug or default to first problem (Two Sum)
  const problem = codingProblems.find((p) => p.slug === slug) || codingProblems[0];

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.starterCode);
  const [outputMessage, setOutputMessage] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const handleRunCode = () => {
    setOutputMessage('Run functionality will be connected to the backend later.');
    setIsOutputVisible(true);
  };

  const handleSubmitCode = () => {
    setOutputMessage('Submission engine will be connected to the backend later.');
    setIsOutputVisible(true);
  };

  return (
    <div className="problem-details-page container">
      {/* Top Header Navigation */}
      <div className="problem-details-header">
        <button className="back-btn" onClick={() => navigate('/coding')}>
          <ArrowLeft size={18} /> Back to Problems
        </button>
        <div className="problem-header-info">
          <h2>{problem.title}</h2>
          <span className={`difficulty-badge badge-${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Split Workspace */}
      <div className="workspace-split">
        {/* Left Side: Problem Statement */}
        <div className="problem-panel left-panel">
          <div className="panel-tab">Problem Description</div>

          <div className="panel-content">
            <h3 className="problem-main-title">Problem: {problem.title}</h3>

            <section className="problem-section">
              <h4>Description</h4>
              <p>{problem.description}</p>
            </section>

            <section className="problem-section">
              <h4>Input Format</h4>
              <pre className="code-block">{problem.inputFormat}</pre>
            </section>

            <section className="problem-section">
              <h4>Output Format</h4>
              <pre className="code-block">{problem.outputFormat}</pre>
            </section>

            <section className="problem-section">
              <h4>Example</h4>
              <pre className="code-block">{problem.example}</pre>
            </section>

            <section className="problem-section">
              <h4>Constraints</h4>
              <pre className="code-block">{problem.constraints}</pre>
            </section>
          </div>
        </div>

        {/* Right Side: Code Editor & Output */}
        <div className="problem-panel right-panel">
          {/* Panel Top Control Bar */}
          <div className="editor-control-bar">
            <div className="language-selector">
              <label htmlFor="lang-select">Language:</label>
              <select
                id="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="select-dropdown"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <span className="editor-tag">Initial UI Sandbox</span>
          </div>

          {/* Textarea Code Editor */}
          <div className="editor-container">
            <textarea
              className="code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              spellCheck="false"
            />
          </div>

          {/* Action Buttons */}
          <div className="editor-actions">
            <Button variant="outline" onClick={handleRunCode}>
              <Play size={16} style={{ marginRight: '6px' }} /> Run Code
            </Button>
            <Button variant="primary" onClick={handleSubmitCode}>
              <Send size={16} style={{ marginRight: '6px' }} /> Submit
            </Button>
          </div>

          {/* Output Display Box */}
          {isOutputVisible && (
            <div className="output-panel">
              <div className="output-header">
                <Terminal size={16} />
                <span>Output</span>
              </div>
              <div className="output-body">
                <p className="output-text">{outputMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
