// Migration script: creates tables if not exist
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
`);

console.log('Migration complete.');
db.close();
