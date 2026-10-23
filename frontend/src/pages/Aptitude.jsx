import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get, post } from '../api';

// Aptitude page: load questions, pick answers, submit, see the score
// Props: user (username string or null)
export default function Aptitude({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [result, setResult] = useState(null); // filled after submit
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/api/questions')
      .then(setQuestions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // not logged in -> ask to log in
  if (!user) return <p>Please <Link to="/login">login</Link> to take the quiz.</p>;
  if (loading) return <p>Loading questions...</p>;

  // sends the answers to the server, which grades them and saves the score
  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return setError('Please answer every question');
    setError('');
    const list = Object.keys(answers).map((id) => ({ questionId: Number(id), selected: answers[id] }));
    try {
      setResult(await post('/api/results', { answers: list }));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h1>Aptitude Quiz</h1>
      {result && <p className="score">Your score: {result.score} / {result.total}</p>}
      <ul>
        {questions.map((q) => {
          const graded = result && result.graded.find((g) => g.questionId === q.id);
          return (
            <li key={q.id} className="card">
              <h3>{q.id}. {q.question}</h3>
              {q.options.map((opt, i) => (
                <label key={i} className="option">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    disabled={!!result}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswers({ ...answers, [q.id]: i })}
                  />
                  {opt}
                </label>
              ))}
              {graded && (
                <p className={graded.isRight ? 'ok' : 'error'}>
                  {graded.isRight ? 'Correct. ' : `Wrong. Right answer: ${q.options[graded.correct]}. `}
                  {graded.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      {error && <p className="error">{error}</p>}
      {!result && questions.length > 0 && <button onClick={handleSubmit}>Submit</button>}
      {result && <Link to="/dashboard">See all my results</Link>}
    </section>
  );
}
