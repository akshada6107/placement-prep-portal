// server.js - the whole backend: Express server + all REST routes + SQLite.
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Load backend/.env if it exists (Node 22+ built-in, no dotenv package needed)
try { process.loadEnvFile(path.join(__dirname, '.env')); } catch { /* no .env file, use defaults */ }

const db = require('./db');
const { questions, problems } = require('./data');

const PORT = process.env.PORT || 5000;
// DEV-ONLY fallback secret. In real life always set JWT_SECRET in .env!
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';
// Validation limits (same numbers are used on the React form)
const USER_MIN = 3, USER_MAX = 20, PASS_MIN = 6;

const app = express();
app.use(express.json()); // lets us read JSON request bodies as req.body

// Auth check (middleware): reads "Authorization: Bearer <token>", puts the user in req.user
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT_SECRET); // { id, username }
    next();
  } catch {
    res.status(401).json({ message: 'Please log in' });
  }
}

// POST /api/register - create a new user (password is hashed with bcrypt)
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (typeof username !== 'string' || username.length < USER_MIN || username.length > USER_MAX)
    return res.status(400).json({ message: `Username must be ${USER_MIN}-${USER_MAX} characters` });
  if (typeof password !== 'string' || password.length < PASS_MIN)
    return res.status(400).json({ message: `Password must be at least ${PASS_MIN} characters` });
  if (db.prepare('SELECT id FROM users WHERE username = ?').get(username))
    return res.status(409).json({ message: 'Username already taken' });
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, hash);
  res.status(201).json({ message: 'Registered' });
});

// POST /api/login - check the password, return a JWT token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(String(username));
  if (!user || !bcrypt.compareSync(String(password), user.password_hash))
    return res.status(401).json({ message: 'Wrong username or password' });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, username: user.username });
});

// GET /api/questions - quiz questions WITHOUT the correct answers (public)
app.get('/api/questions', (req, res) => {
  res.json(questions.map(({ correct, explanation, ...rest }) => rest));
});

// POST /api/results - grade the answers on the server and save the score (needs login)
// body: { answers: [{ questionId: 1, selected: 2 }, ...] }
app.post('/api/results', auth, (req, res) => {
  const answers = req.body.answers;
  if (!Array.isArray(answers)) return res.status(400).json({ message: 'answers must be an array' });
  const graded = questions.map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    return { questionId: q.id, correct: q.correct, explanation: q.explanation, isRight: !!a && a.selected === q.correct };
  });
  const score = graded.filter((g) => g.isRight).length;
  const info = db.prepare('INSERT INTO results (user_id, score, total) VALUES (?, ?, ?)')
    .run(req.user.id, score, questions.length);
  res.status(201).json({ id: info.lastInsertRowid, score, total: questions.length, graded });
});

// GET /api/results - the logged-in user's own results, newest first (needs login)
app.get('/api/results', auth, (req, res) => {
  res.json(db.prepare('SELECT id, score, total, created_at FROM results WHERE user_id = ? ORDER BY id DESC').all(req.user.id));
});

// DELETE /api/results/:id - delete one of YOUR results (needs login)
app.delete('/api/results/:id', auth, (req, res) => {
  const info = db.prepare('DELETE FROM results WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Result not found' });
  res.json({ message: 'Deleted' });
});

// GET /api/problems - list of coding problems (public)
app.get('/api/problems', (req, res) => res.json(problems));

// GET /api/problems/:id - one coding problem (public)
app.get('/api/problems/:id', (req, res) => {
  const problem = problems.find((p) => p.id === Number(req.params.id));
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
});

// Serves the built React app after `npm run build` (only the dist folder, nothing else)
app.use(express.static(path.join(__dirname, '../dist')));
// Any other non-API URL gets index.html so React Router can handle it on refresh
app.get('/{*splat}', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => err && next());
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
