const rooms = new Map();
const metadata = new Map();

function createRoom(name) {
  rooms.set(name, new Set());
  metadata.set(name, { topic: '' });
}

function deleteRoom(name) {
  rooms.delete(name);
  metadata.delete(name);
}

function getClients(room) {
  return rooms.get(room) || new Set();
}

function getMetadata(room) {
  return metadata.get(room) || { topic: '' };
}

module.exports = {
  rooms,
  metadata,
  createRoom,
  deleteRoom,
  getClients,
  getMetadata
};
