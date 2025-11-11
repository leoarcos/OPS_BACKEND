let io;

function init(server) {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io no inicializado!');
  }
  return io;
}

module.exports = { init, getIO };
