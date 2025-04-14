const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = new Map();
const roles = new Map();
const metadata = new Map();

const words = fs.readFileSync(path.join(__dirname, 'words.txt'), 'utf-8').split('\n').filter(Boolean);
const generateRoomName = () => {
  const pick = () => words[Math.floor(Math.random() * words.length)];
  return `${pick()}-${pick()}-${pick()}`;
};

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/new', (req, res) => {
  let room;
  do {
    room = generateRoomName();
  } while (rooms.has(room));
  rooms.set(room, new Set());
  metadata.set(room, { topic: '' });
  res.redirect(`/room/${room}`);
});

app.get('/room/:room', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

wss.on('connection', (ws, req) => {
  const params = new URLSearchParams(req.url.replace('/?', ''));
  const room = params.get('room');
  if (!room) return ws.close();

  ws.id = Math.random().toString(36).substr(2, 9);
  if (!rooms.has(room)) rooms.set(room, new Set());
  const clients = rooms.get(room);
  clients.add(ws);

  const role = clients.size === 1 ? 'host' : 'listener';
  roles.set(ws, role);
  ws.send(JSON.stringify({ type: 'role', isBroadcaster: role !== 'listener', role, id: ws.id }));

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if (data.type === 'update-topic' && roles.get(ws) === 'host') {
      metadata.get(room).topic = data.topic;
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'topic-update', topic: data.topic }));
        }
      }
    } else {
      for (const client of clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ ...data, id: ws.id }));
        }
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    roles.delete(ws);
    if (clients.size === 0) {
      rooms.delete(room);
      metadata.delete(room);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
