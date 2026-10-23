// ScoreCard - one saved quiz result. Props: result (object) and onDelete (function)
export default function ScoreCard({ result, onDelete }) {
  return (
    <li className="card">
      <h3>Score: {result.score} / {result.total}</h3>
      <p className="muted">{new Date(result.created_at.replace(' ', 'T') + 'Z').toLocaleString()}</p>
      <button className="danger" onClick={() => onDelete(result.id)}>Delete</button>
    </li>
  );
}
