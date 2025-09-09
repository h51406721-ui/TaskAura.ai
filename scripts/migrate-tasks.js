// Migration for tasks table
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT 0,
  userId INTEGER NOT NULL
);
`);

console.log('Tasks table migration complete.');
db.close();
