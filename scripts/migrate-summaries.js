// Migration for summaries table
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS summaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL,
  summary TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
`);

console.log('Summaries table migration complete.');
db.close();
