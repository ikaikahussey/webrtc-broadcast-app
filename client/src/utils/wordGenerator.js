import wordList from './wordList.json';

export function generateRoomName() {
  const pick = () => wordList[Math.floor(Math.random() * wordList.length)];
  return `${pick()}-${pick()}-${pick()}`;
}
