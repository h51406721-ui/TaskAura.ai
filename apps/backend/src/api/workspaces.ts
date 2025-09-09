import express from 'express';
import db from '../db';

const router = express.Router();

// Get all workspaces
router.get('/', (req: express.Request, res: express.Response) => {
  const workspaces = db.prepare('SELECT * FROM workspaces').all();
  res.json(workspaces);
});

// Create workspace
router.post('/', (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const info = db.prepare('INSERT INTO workspaces (name) VALUES (?)').run(name);
  res.status(201).json({ id: info.lastInsertRowid });
});

export default router;
