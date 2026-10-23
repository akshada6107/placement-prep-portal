// db.js - opens the SQLite database file and creates the tables if they are missing.
const Database = require('better-sqlite3');
const path = require('path');

// DB_FILE can be set in the environment (used for testing); default is backend/preppath.db
const file = process.env.DB_FILE || path.join(__dirname, 'preppath.db');
const db = new Database(file); // the file is created automatically if it does not exist

// users table: one row per registered person (we store only the password HASH)
// results table: one row per finished quiz, linked to a user by user_id
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
