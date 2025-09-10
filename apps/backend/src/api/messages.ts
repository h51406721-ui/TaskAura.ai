import express from 'express';
import db from '../db';
import { MessageSchema } from '../../../../packages/shared-types/src/schemas';

const router = express.Router();

// GET /api/messages
router.get('/', (_req: express.Request, res: express.Response) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY createdAt ASC').all();
  return res.json(messages);
});

// POST /api/messages
router.post('/', (_req: express.Request, res: express.Response) => {
  const result = MessageSchema.safeParse(_req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  const { userId, content, createdAt, client_id } = _req.body;
  // Deduplicate by client_id
  const exists = db.prepare('SELECT 1 FROM messages WHERE client_id = ?').get(client_id);
  if (exists) return res.status(409).json({ error: 'Duplicate message' });
  db.prepare('INSERT INTO messages (userId, content, createdAt, client_id) VALUES (?, ?, ?, ?)')
    .run(userId, content, createdAt, client_id);
  return res.status(201).json({ message: 'Message sent' });
});

export default router;
