const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

const { init } = require('./socket');

const app = express();
const server = http.createServer(app);

const io = init(server); // Inicializamos socket.io aquí

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/eventos', eventoRoutes);

app.use('/documentos/eventos', express.static(path.join(__dirname, '../documentos/eventos')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
