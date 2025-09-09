import express from 'express';
import db from '../db';

const router = express.Router();

// Get all summaries (optionally filter by period)
router.get('/', (req: express.Request, res: express.Response) => {
  const { period } = req.query;
  let summaries;
  if (period) {
    summaries = db.prepare('SELECT * FROM summaries WHERE period = ? ORDER BY createdAt DESC').all(period);
  } else {
    summaries = db.prepare('SELECT * FROM summaries ORDER BY createdAt DESC').all();
  }
  res.json(summaries);
});

export default router;
