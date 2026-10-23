import { useState, useEffect } from 'react';
import { get } from '../api';
import ProblemCard from '../components/ProblemCard';

// Coding page: loads the problem list from the API and shows it
export default function Coding() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // runs once when the page opens
  useEffect(() => {
    get('/api/problems')
      .then(setProblems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h1>Coding Problems</h1>
      <ul>
        {problems.map((p) => <ProblemCard key={p.id} problem={p} />)}
      </ul>
    </section>
  );
}
