const fs = require('fs');
const path = require('path');

const words = fs.readFileSync(path.join(__dirname, 'words.txt'), 'utf-8').split('\n').filter(Boolean);

function generateRoomName() {
  const pick = () => words[Math.floor(Math.random() * words.length)];
  return `${pick()}-${pick()}-${pick()}`;
}

module.exports = { generateRoomName };
