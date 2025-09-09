// Simple audit log helper
import Database from 'better-sqlite3';
const db = new Database('mindforge.sqlite');

export function logAudit(action: string, details: string, userId?: number) {
  db.prepare('INSERT INTO audit_log (action, details, userId, timestamp) VALUES (?, ?, ?, ?)')
    .run(action, details, userId ?? null, new Date().toISOString());
}
