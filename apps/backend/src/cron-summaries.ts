// Cron job for daily/weekly/monthly summaries
import Database from 'better-sqlite3';
import fetch from 'node-fetch';
import { chatPrompt } from './ai/prompts';

const db = new Database('mindforge.sqlite');

async function generateSummary(period: 'daily' | 'weekly' | 'monthly') {
  // Example: summarize all tasks for the period
  const tasks = db.prepare('SELECT * FROM tasks WHERE completed = 1').all();
  const prompt = `${chatPrompt}\nSummarize the following completed tasks (${period}):\n` +
  tasks.map((t: { title: string; description?: string }) => `- ${t.title}: ${t.description || ''}`).join('\n');
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const summary = await res.text();
  db.prepare('INSERT INTO summaries (period, summary, createdAt) VALUES (?, ?, ?)')
    .run(period, summary, new Date().toISOString());
  console.log(`${period} summary generated.`);
}

export async function runAllSummaries() {
  await generateSummary('daily');
  await generateSummary('weekly');
  await generateSummary('monthly');
}

if (require.main === module) {
  runAllSummaries();
}
