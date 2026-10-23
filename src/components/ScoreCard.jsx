// ScoreCard - one saved quiz result. Props: result (object) and onDelete (function)
export default function ScoreCard({ result, onDelete }) {
  return (
    <li className="card">
      <h3>Score: {result.score} / {result.total}</h3>
      <p>{result.created_at}</p>
      <button className="danger" onClick={() => onDelete(result.id)}>Delete</button>
    </li>
  );
}
