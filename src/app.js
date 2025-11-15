const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const cooperantesRoutes = require('./routes/cooperantesRoutes');
const presenciaCooperantesRoutes = require('./routes/presenciaCooperantesRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

const { init } = require('./socket');

const app = express();
const server = http.createServer(app);

const io = init(server); // Inicializamos socket.io aquí

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/cooperantes', cooperantesRoutes);
app.use('/api/presenciaCooperantes', presenciaCooperantesRoutes);

app.use('/api/eventos', eventoRoutes);

app.use('/documentos/eventos', express.static(path.join(__dirname, '../documentos/eventos')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
