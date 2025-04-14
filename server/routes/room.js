const express = require('express');
const { generateRoomName } = require('../utils');
const { createRoom } = require('../rooms');

const router = express.Router();

router.get('/new', (req, res) => {
  let room;
  do {
    room = generateRoomName();
  } while (roomExists(room));

  createRoom(room);
  res.redirect(`/room/${room}`);
});

function roomExists(name) {
  const { rooms } = require('../rooms');
  return rooms.has(name);
}

module.exports = router;
