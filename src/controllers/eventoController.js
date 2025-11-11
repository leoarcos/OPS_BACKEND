const fs = require('fs');
const path = require('path');

const eventosPath = path.join(__dirname, '../../documentos/eventos');

function listEventosFiles(req, res) {
  fs.readdir(eventosPath, (err, files) => {
    if (err) {
      console.error('Error al listar archivos:', err);
      return res.status(500).json({ error: 'No se pudo listar archivos' });
    }
    res.json({ files });
  });
}

function downloadFile(req, res) {
  const filename = req.params.filename;
  const filePath = path.join(eventosPath, filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    res.download(filePath);
  });
}

module.exports = {
  listEventosFiles,
  downloadFile
};
