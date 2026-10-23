import { Link } from 'react-router-dom';

// Preparation page: a simple list of modules, each is a link
export default function Preparation() {
  return (
    <section>
      <h1>Preparation Modules</h1>
      <ul>
        <li className="card"><h3>Aptitude</h3><p>Quantitative and logical reasoning.</p><Link to="/aptitude">Start Aptitude</Link></li>
        <li className="card"><h3>Coding</h3><p>Data structures and algorithms problems.</p><Link to="/coding">Start Coding</Link></li>
      </ul>
    </section>
  );
}
