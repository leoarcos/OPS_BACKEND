const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/files', eventoController.listEventosFiles);
router.get('/files/:filename', eventoController.downloadFile);

module.exports = router;
