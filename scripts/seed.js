// Seed script: insert initial data
const Database = require('better-sqlite3');
const db = new Database('mindforge.sqlite');

db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)').run('Alice', 'alice@example.com');
db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)').run('Bob', 'bob@example.com');

console.log('Seed data inserted.');
db.close();
