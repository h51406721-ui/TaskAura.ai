
type DBTask = { id: number; title: string; description: string; completed: boolean; userId: number };
import express from 'express';
import db from '../db';
import { TaskSchema } from '../../../../packages/shared-types/src/schemas';
import { logAudit } from '../db-audit';

const router = express.Router();

// Get all tasks
router.get('/', (req: express.Request, res: express.Response) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

// Create task
router.post('/', (req: express.Request, res: express.Response) => {
  const result = TaskSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  const { title, description, completed, userId } = req.body;
  const info = db.prepare('INSERT INTO tasks (title, description, completed, userId) VALUES (?, ?, ?, ?)')
    .run(title, description, completed ?? false, userId);
  logAudit('CREATE_TASK', `Task: ${title}`, userId);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Update task (enforce status transitions)
router.put('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const result = TaskSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  const { title, description, completed, userId } = req.body;
  // Enforce status transitions (example: cannot mark completed -> incomplete)
  type DBTask = { id: number; title: string; description: string; completed: boolean; userId: number };
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as DBTask | undefined;
  if (!existing) return res.status(404).json({ error: 'Task not found' });
  if (existing.completed && !completed) return res.status(400).json({ error: 'Cannot mark completed task as incomplete' });
  db.prepare('UPDATE tasks SET title = ?, description = ?, completed = ?, userId = ? WHERE id = ?')
    .run(title, description, completed, userId, id);
  logAudit('UPDATE_TASK', `Task: ${title}`, userId);
  res.json({ success: true });
});

// Delete task
router.delete('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as DBTask | undefined;
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  logAudit('DELETE_TASK', `Task: ${task?.title ?? id}`, task?.userId);
  res.json({ success: true });
});

export default router;
