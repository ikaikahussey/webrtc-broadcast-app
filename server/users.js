const roles = new Map();

function assignRole(client, clientsInRoom) {
  const role = clientsInRoom.size === 0 ? 'host' : 'listener';
  roles.set(client, role);
  return role;
}

function getRole(client) {
  return roles.get(client);
}

function removeRole(client) {
  roles.delete(client);
}

module.exports = {
  roles,
  assignRole,
  getRole,
  removeRole
};
