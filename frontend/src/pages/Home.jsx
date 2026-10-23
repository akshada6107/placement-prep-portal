import { Link } from 'react-router-dom';

// Home page: hero (badge, heading, buttons, image) + a list of 3 feature cards
export default function Home() {
  return (
    <>
      <section className="hero">
        <img src="/logo.svg" alt="PrepPath logo" width="96" height="96" />
        <br />
        <span className="badge">✨ Placement prep made simple</span>
        <h1>Prepare Better. Get Placement Ready.</h1>
        <p className="subtitle">Practice aptitude and coding in one place, and keep track of every score.</p>
        <div className="actions">
          <Link to="/aptitude" className="btn">Start the quiz →</Link>
          <Link to="/coding" className="btn btn-outline">Browse problems</Link>
        </div>
      </section>

      <ul>
        <li className="card"><span className="icon">🧠</span><h3>Aptitude Quiz</h3><p className="muted">Quick reasoning questions, graded instantly.</p></li>
        <li className="card"><span className="icon">💻</span><h3>Coding Problems</h3><p className="muted">Classic problems with examples and constraints.</p></li>
        <li className="card"><span className="icon">📊</span><h3>Your Results</h3><p className="muted">Every quiz score saved to your account.</p></li>
      </ul>
    </>
  );
}
