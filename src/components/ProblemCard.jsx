import { Link } from 'react-router-dom';

// ProblemCard - one row in the coding problem list. Props: problem (object)
export default function ProblemCard({ problem }) {
  return (
    <li className="card">
      <h3>{problem.title}</h3>
      <p>{problem.category} | {problem.difficulty}</p>
      <Link to={`/coding/${problem.id}`}>Open problem</Link>
    </li>
  );
}
