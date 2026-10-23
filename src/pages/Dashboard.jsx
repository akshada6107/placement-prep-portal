import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get, del } from '../api';
import ScoreCard from '../components/ScoreCard';

// Dashboard page: lists the logged-in user's saved results and lets them delete one
// Props: user (username string or null)
export default function Dashboard({ user }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // load results when the page opens (only if logged in)
  useEffect(() => {
    if (user) get('/api/results').then(setResults).catch((err) => setError(err.message));
  }, [user]);

  // asks the server to delete, then removes it from the list on screen
  async function handleDelete(id) {
    try {
      await del(`/api/results/${id}`);
      setResults(results.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user) return <p>Please <Link to="/login">login</Link> to see your results.</p>;

  return (
    <section>
      <h1>My Results</h1>
      {error && <p className="error">{error}</p>}
      {results.length === 0 ? (
        <p>No results yet. <Link to="/aptitude">Take the quiz</Link></p>
      ) : (
        <ul>
          {results.map((r) => <ScoreCard key={r.id} result={r} onDelete={handleDelete} />)}
        </ul>
      )}
    </section>
  );
}
