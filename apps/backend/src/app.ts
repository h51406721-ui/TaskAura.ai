import express from 'express';
import db from './db';
import { UserSchema } from '../../../packages/shared-types/src/schemas';
import { hashPassword, comparePassword, generateToken } from './auth';
import { authGuard } from './middleware';
import messagesRouter from './api/messages';
import tasksRouter from './api/tasks';
import summariesRouter from './api/summaries';
import workspacesRouter from './api/workspaces';

const app = express();
app.use(express.json());

// Health check endpoint for test and monitoring
app.get('/api/health', (req: import('express').Request, res: import('express').Response) => {
  console.log('HEALTH ENDPOINT HIT');
  res.status(200).json({ status: 'ok' });
});
// ...existing code...
// Catch-all 404 handler (must be last)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Global error handler (must be last)
app.use((err: any, req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
  console.error('GLOBAL ERROR HANDLER:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use('/api/messages', messagesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/summaries', summariesRouter);
app.use('/api/workspaces', workspacesRouter);

// Register endpoint
app.post('/register', async (req: import('express').Request, res: import('express').Response) => {
  const result = UserSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  const { name, email, password } = req.body;
  const hashed = await hashPassword(password);
  try {
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashed);
    res.status(201).json({ message: 'User registered' });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login endpoint
app.post('/login', async (req: import('express').Request, res: import('express').Response) => {
  const { email, password } = req.body;
  type DBUser = { id: number; name: string; email: string; password: string };
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DBUser | undefined;
  if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken({ id: user.id, name: user.name, email: user.email });
  res.json({ token });
});

// Example protected route
app.get('/me', authGuard, (req: import('express').Request, res: import('express').Response) => {
  res.json({ user: (req as any).user });
});

export default app;
