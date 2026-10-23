# EXPLAIN.md - PrepPath cheat sheet (branch `simple`)

Stack: **React 19 + Vite** (frontend), **Express 5** (backend), **SQLite** via `better-sqlite3` (database), **bcryptjs** (password hashing), **jsonwebtoken** (login token).

## 1. How to run

Two terminals (the Vite dev server forwards `/api` to Express, so you need both):

```
# Terminal 1 - backend (http://localhost:5050)
cd backend
npm install
cp .env.example .env        # optional; edit JWT_SECRET. Without .env a dev-only secret is used
npm run dev                 # = node --watch server.js   (or: npm start)

# Terminal 2 - frontend (http://localhost:5173)
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173**. The database file `backend/preppath.db` is created automatically the first time the backend starts (no setup, works offline). It is git-ignored (`*.db`).

Single-server mode (practical 14): `cd frontend && npm run build` (creates `frontend/dist/`, the optimised copy of the site with auto-generated file names - never edit it, it is git-ignored), then `cd backend && npm start` and open **http://localhost:5050**. Express serves `frontend/dist/`.

If `better-sqlite3` ever fails to install (native build), Node 22+ has a built-in `node:sqlite` (`DatabaseSync`) that can replace it in `backend/db.js`. It was not needed here: the install worked.

## 2. Folder structure

```
placement-prep-portal/
├── backend/            Express + SQLite (port 5050)
│   ├── server.js       all routes + auth check
│   ├── db.js           opens SQLite, creates tables
│   ├── data.js         quiz questions + coding problems
│   └── .env.example    settings names (copy to .env)
├── frontend/           React + Vite (port 5173)
│   ├── index.html      the one HTML page
│   ├── vite.config.js  /api proxy -> port 5050
│   ├── public/         logo.svg (served as-is)
│   └── src/
│       ├── main.jsx, App.jsx, api.js, index.css
│       ├── pages/      one file per page
│       └── components/ ProblemCard, ScoreCard
├── EXPLAIN.md
└── README.md
```
Not in git (created on your machine): `node_modules/` (installed packages), `package-lock.json`, `backend/preppath.db` (the database), `frontend/dist/` (only after `npm run build`).

## 3. What each file does

| File | What it does |
|---|---|
| `index.html` | The one HTML page; React fills `<div id="root">` |
| `vite.config.js` | Vite setup + the `/api` proxy to port 5050 |
| `src/main.jsx` | Starts React and loads `index.css` |
| `src/App.jsx` | Router, navbar, footer, and the login state (`user`) |
| `src/api.js` | `get` / `post` / `del` helpers built on `fetch`; adds the token header |
| `src/index.css` | The only stylesheet (colours in `:root`, one fade-in animation) |
| `src/pages/Home.jsx` | Hero (logo image, badge, heading, buttons) + list of 3 feature cards |
| `src/pages/About.jsx`, `Preparation.jsx` | Short static pages |
| `src/pages/Register.jsx` | Register form with validation |
| `src/pages/Login.jsx` | Login form, saves token |
| `src/pages/Aptitude.jsx` | Quiz: load questions, choose, submit, show score |
| `src/pages/Coding.jsx` | List of coding problems |
| `src/pages/ProblemDetails.jsx` | One problem (read-only) + code textarea |
| `src/pages/Dashboard.jsx` | Your saved results with Delete |
| `src/components/ProblemCard.jsx` | One problem in the list (prop: `problem`) |
| `src/components/ScoreCard.jsx` | One saved result (props: `result`, `onDelete`) |
| `backend/server.js` | Express server, every REST route, auth check, static files |
| `backend/db.js` | Opens SQLite and creates the `users` and `results` tables |
| `backend/data.js` | The quiz questions and coding problems (only copy) |
| `backend/.env.example` | Names of the settings: `JWT_SECRET`, `PORT` |
| `public/logo.svg` | Logo (tab icon, navbar, Home page image) |

## 4. What changed from `main`

- **Database: MongoDB/Mongoose -> SQLite** (`better-sqlite3`). Tables: `users(id, username UNIQUE, password_hash, created_at)` and `results(id, user_id, score, total, created_at)`. Parameterized queries (`?`) only.
- **Auth kept but simpler**: Register + Login (bcrypt hash, JWT token in `localStorage`). The check is one function `auth` in `server.js`. `AuthContext`, `utils/auth.js`, `authMiddleware.js`, login/register popups were removed; login state is a plain `useState` in `App.jsx` passed as props.
- **axios -> `fetch`** in `src/api.js`.
- **No CORS package, no hardcoded `localhost:5050` URL**: the Vite proxy (`vite.config.js` line 8) forwards `/api`. `cors`, `dotenv`, `nodemon` removed (`process.loadEnvFile`, `node --watch`).
- **Backend routes folder, models folder, config, middleware** -> merged into `server.js`, `db.js`, `data.js`.
- **Coding**: the fake "submit = Accepted" and the submissions model are gone. Problems are read-only. Progress model/route removed.
- **Aptitude**: all questions on one page; the server grades the answers and saves the score. Dashboard = saved results (create / read / delete).
- **Frontend data duplicates** (`src/data/*.js`) removed; data lives only in the backend.
- **CSS**: 1670 lines + `App.css` -> one ~230-line `index.css` (teal/amber gradients, glass navbar, one fade-in animation, small hover lifts). **lucide-react**, oxlint, `PROJECT_REPORT.md` removed. About/Preparation kept but simplified.
- Fixed: duplicate `/coding/problem` route; quiz question 5 had a wrong answer/explanation, replaced with a simple one.
- Added: `public/logo.svg` (replaces the purple Vite placeholder images), `.env.example`, `*.db` in `.gitignore`.
- Fixed: blank 500 errors when a request had no JSON body; expired login now sends you back to Login; loading messages; quiz asks you to answer every question; result dates shown in local time.

## 5. How the app works (step by step)

1. You type a username/password on **Register** (`Register.jsx`); the checks run in `handleSubmit`; errors show inline.
2. `post('/api/register')` in `api.js` -> Vite proxy -> Express `POST /api/register` (`server.js:34`) validates again, hashes the password with bcrypt, inserts a row into `users` (409 if the name exists).
3. On **Login**, `POST /api/login` (`server.js:48`) compares the password with the hash and returns a JWT `token`. `App.jsx` saves token + name in `localStorage` and in `useState`.
4. **Aptitude** loads `GET /api/questions` (no answers inside). You pick options (state `answers`) and click Submit.
5. `POST /api/results` sends `Authorization: Bearer <token>`. The `auth` function (`server.js:23`) checks the token, the server counts correct answers, inserts a row in `results`, and returns the score plus right answers/explanations.
6. React shows the score (conditional rendering) and marks each question right/wrong.
7. **Dashboard** calls `GET /api/results` (only your rows) and renders `ScoreCard`s. Delete calls `DELETE /api/results/:id`, then removes the card from state.
8. Coding pages call the public `GET /api/problems` and `GET /api/problems/:id`.

## 6. "Teacher asks -> change this"

| Change | File:line | What to type |
|---|---|---|
| Page title (browser tab) | `index.html:7` | edit text in `<title>` |
| Main heading (Home) | `src/pages/Home.jsx` | edit the `<h1>` text |
| Button text (Submit quiz) | `src/pages/Aptitude.jsx`, near the end | change `Submit` |
| Register button text | `src/pages/Register.jsx`, `<button type="submit">` | change `Register` |
| Input placeholder | `src/pages/Register.jsx` | edit `placeholder="..."` |
| Username / password limits | `src/pages/Register.jsx:6-8` AND `backend/server.js:17` | change the numbers in both |
| Validation message | `src/pages/Register.jsx` `handleSubmit` / `server.js` register route | edit the text |
| Main colour | `src/index.css` `:root` | `--primary-color: #0f766e;` -> e.g. `#2563eb` |
| Background colour | `src/index.css` `:root` | `--bg-color: #f6faf9;` |
| Card/box size or look | `src/index.css` `.card` block; `--page-width` in `:root` | edit padding / width |
| Grid columns | `src/index.css` `ul` block | `repeat(auto-fit, minmax(260px, 1fr))` -> `repeat(3, 1fr)` |
| Layout direction (flex) | `src/index.css` `.hero` / `.navbar` (`display: flex`) | add `flex-direction: column;` |
| Mobile breakpoint | `src/index.css` `@media (max-width: 700px)` | change `700px` |
| Hover effect | `src/index.css` `li.card:hover`, `button:hover` | change `translateY(-4px)` |
| Animation | `src/index.css` `@keyframes fadeUp` | change `0.5s` or `16px`; delete `main > * { animation... }` to turn it off |
| Position example | `src/index.css` `.navbar` | `sticky` -> `fixed`/`static` |
| Backend port | `backend/.env` `PORT=` (default in `server.js:13`) AND `vite.config.js:8` | keep both the same |
| API URL | `src/api.js` callers use `/api/...`; proxy target at `vite.config.js:8` | edit target |
| DB file / table | `backend/db.js:6` (file name), `db.js:12-24` (tables) | edit names |
| Add a new field (e.g. `email` on users) | `db.js` (column; delete old `.db` file) -> `server.js` register route (read `req.body.email`, validate, add to INSERT) -> `Register.jsx` (state, input, check, `post(...)` body) | |

## 7. Practical -> where it is shown

| # | Practical | Where |
|---|---|---|
| 1 | HTML headings/lists/images | `Home.jsx` (h1, h3, `<ul>`, `<img src="/logo.svg">`), every page has an h1 |
| 2 | Semantic HTML | `App.jsx` (`header`, `nav`, `main`, `footer`), pages use `section`, `form`, `label` |
| 3 | CSS inline/internal/external | external `src/index.css` only (inline = `style={{ color: 'red' }}` in JSX; internal = a `<style>` tag in `index.html` - say this if asked) |
| 4 | Flexbox/grid/media queries | `index.css`: `.navbar` / `.actions` (flex), `ul` (grid), `@media (max-width: 700px)` |
| 5 | CSS position | `index.css` `.navbar` (`position: sticky`) |
| 6 | Linked JS + events + array functions | `index.html` links `src/main.jsx`; `.map` / `.filter` / `.find` in `Aptitude.jsx` and `Dashboard.jsx`; `onClick` / `onChange` |
| 7 | JS form validation | `Register.jsx` `handleSubmit` |
| 8 | React SPA + JSX | `main.jsx`, `App.jsx` (React Router, no page reload) |
| 9 | Props/state/hooks/events/conditional rendering | `ProblemCard`, `ScoreCard` (props); `useState`/`useEffect` in pages; `onClick`/`onChange`/`onSubmit`; loading/error/empty/score conditions |
| 10 | fetch + JSON | `src/api.js` |
| 11 | DOM manipulation + events | React updates the DOM from state (e.g. Delete removes a card); `main.jsx` uses `document.getElementById('root')` |
| 12 | PHP forms/sessions | NOT covered (Node, not PHP) |
| 13 | PHP-MySQL CRUD | NOT covered (but the same CRUD idea is done with Express + SQLite) |
| 14 | Node + Express server/routing/static | `backend/server.js` (routes, `express.static`) |
| 15 | REST API + Node/Express + DB | `server.js` routes + `db.js` (SQLite) |

## 8. Viva questions

**React**
- *What is JSX?* HTML-like syntax inside JS; Vite turns it into `React.createElement` calls.
- *Props vs state?* Props come from the parent and are read-only (`ScoreCard result=...`). State (`useState`) is data the component owns and changes.
- *What does `useEffect(..., [])` do?* Runs once after the first render; we use it to fetch data.
- *Why `e.preventDefault()`?* Stops the browser reloading the page when a form is submitted.
- *Why is login state in `App.jsx`?* Several pages need it; the parent holds it and passes `user` down as a prop.
- *What is a SPA?* One HTML page; React Router swaps components without reloading.
- *Why `key` in `.map()`?* Lets React track each list item.

**Express / REST**
- *What is Express?* A Node library for routes and middleware. `app.get/post/delete` = routes.
- *What is middleware?* A function that runs before the route; `express.json()` parses bodies and `auth` checks the token.
- *GET/POST/DELETE?* Read / create / remove. Status codes: 200 OK, 201 created, 400 bad input, 401 not logged in, 404 not found, 409 conflict (duplicate username).
- *What does `express.static` do?* Serves files (the built `frontend/dist/` folder) directly.
- *Why does the server grade the quiz?* So correct answers are never sent to the browser before submitting.

**SQLite**
- *What is SQLite?* A database stored in one file (`preppath.db`), no separate server.
- *SQL injection?* Bad input turning into SQL. We use `?` placeholders (`db.prepare(...).run(value)`), so input is data, not SQL.
- *Foreign key?* `results.user_id` points to `users.id`, so each result belongs to one user. `UNIQUE` on `username` stops duplicates.

**bcrypt / JWT**
- *Why hash passwords?* If the database leaks, real passwords are not exposed. bcrypt is slow on purpose and adds a random salt.
- *What is a JWT?* A signed token (`header.payload.signature`) containing the user id/name. The server checks the signature with `JWT_SECRET`; the browser sends it as `Authorization: Bearer <token>`.
- *Why keep the secret in `.env`?* Anyone with the secret could forge tokens; `.env` is git-ignored.
- *Where is the token stored?* `localStorage` (simple; cleared on Logout).

**Vite proxy / fetch**
- *What does the proxy do?* In dev, the browser talks only to :5173; Vite forwards `/api/...` to :5050, so no CORS errors and no hardcoded URL.
- *fetch vs axios?* `fetch` is built into the browser; it returns a Promise, and you call `res.json()`. It does not throw on 404/500, so `api.js` checks `res.ok` itself.
- *async/await?* Writes Promise code in a readable top-to-bottom style.
