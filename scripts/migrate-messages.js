// Migration for messages table with client_id deduplication
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  content TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  client_id TEXT UNIQUE NOT NULL
);
`);

console.log('Messages table migration complete.');
db.close();
