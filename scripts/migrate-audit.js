// Migration for audit_log table
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  details TEXT,
  userId INTEGER,
  timestamp TEXT NOT NULL
);
`);

console.log('Audit log table migration complete.');
db.close();
