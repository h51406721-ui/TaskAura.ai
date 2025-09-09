// Migration for workspaces table
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS workspaces (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
`);

console.log('Workspaces table migration complete.');
db.close();
