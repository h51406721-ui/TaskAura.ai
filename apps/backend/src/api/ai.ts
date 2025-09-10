
import express from 'express';
import fetch from 'node-fetch';
import { chatPrompt, taskExtractionPrompt } from '../ai/prompts';
import multer from 'multer';



const upload = multer();
const router = express.Router();

// SSE streaming chat endpoint
router.post('/chat', async (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { message } = req.body;
  // Stream from Ollama
  const ollamaRes = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: chatPrompt + '\n' + message })
  });
  if (ollamaRes.body) {
    for await (const chunk of ollamaRes.body) {
      res.write(`data: ${chunk.toString()}\n\n`);
    }
  }
  res.end();
});

// Task extraction endpoint
router.post('/tasks/from-message', async (req: express.Request, res: express.Response) => {
  const { message } = req.body;
  const ollamaRes = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: taskExtractionPrompt + '\n' + message })
  });
  const data = await ollamaRes.json();
  res.json(data);
});


// Voice transcription endpoint
router.post('/transcribe', upload.single('file'), async (req: express.Request, res: express.Response) => {
  const file = (req as any).file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });
  const whisperRes = await fetch('http://localhost:9000/inference', {
    method: 'POST',
    body: file.buffer,
    headers: { 'Content-Type': file.mimetype }
  });
  const text = await whisperRes.text();
    return res.json({ text });
});

export default router;
