import { WebSocketServer } from 'ws';
import http from 'http';
import app from './server';

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: import('ws').WebSocket) => {
  ws.on('message', (message: string) => {
    // Broadcast to all clients
    if (wss.clients) {
      wss.clients.forEach((client: import('ws').WebSocket) => {
        if (client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
    }
  });
});

server.listen(3001, () => {
  console.log('WebSocket server running on ws://localhost:3001');
});
