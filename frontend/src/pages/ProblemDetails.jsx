import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { get } from '../api';

// ProblemDetails page: shows one problem (read-only) and a textarea to write code in
export default function ProblemDetails() {
  const { id } = useParams(); // the :id from the URL /coding/:id
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    get(`/api/problems/${id}`)
      .then((p) => { setProblem(p); setCode(p.starterCode); })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!problem) return <p>Loading...</p>;

  return (
    <section>
      <Link to="/coding">Back to problems</Link>
      <h1>{problem.title}</h1>
      <p>{problem.category} | {problem.difficulty}</p>
      <p>{problem.description}</p>
      <h2>Example</h2>
      <pre>{problem.example}</pre>
      <h2>Constraints</h2>
      <pre>{problem.constraints}</pre>
      <h2>Your code</h2>
      <textarea rows="12" value={code} onChange={(e) => setCode(e.target.value)} />
    </section>
  );
}
