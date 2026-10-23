import { Link } from 'react-router-dom';

// Home page: heading, one image and a list of what you can do
export default function Home() {
  return (
    <section className="hero">
      <div>
        <h1>Prepare Better. Get Placement Ready.</h1>
        <p>Practice aptitude and coding in one place.</p>
        <ul>
          <li><Link to="/aptitude">Take the aptitude quiz</Link></li>
          <li><Link to="/coding">Browse coding problems</Link></li>
          <li><Link to="/dashboard">See your saved results</Link></li>
        </ul>
      </div>
      <img src="/hero.png" alt="PrepPath illustration" width="200" />
    </section>
  );
}
