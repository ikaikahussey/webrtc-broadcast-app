const { rooms, metadata, createRoom, deleteRoom, getClients, getMetadata } = require('../rooms');
const { roles, assignRole, getRole, removeRole } = require('../users');
const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url.replace('/?', ''));
    const room = params.get('room');
    if (!room) return ws.close();

    ws.id = Math.random().toString(36).substr(2, 9);
    if (!rooms.has(room)) createRoom(room);

    const clients = getClients(room);
    clients.add(ws);
    const role = assignRole(ws, clients);

    ws.send(JSON.stringify({ type: 'role', isBroadcaster: role !== 'listener', role, id: ws.id }));

    ws.on('message', (msg) => {
      const data = JSON.parse(msg);
      if (data.type === 'update-topic' && getRole(ws) === 'host') {
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
      removeRole(ws);
      if (clients.size === 0) deleteRoom(room);
    });
  });
}

module.exports = { setupWebSocket };
