const express = require('express');
const router = express.Router();
const controller = require('../controllers/presenciaCooperantesController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.getAllData);
router.get('/:id', authenticateToken, controller.getDataById);
router.post('/register',  authenticateToken, controller.create);
router.put('/edit/:id',  authenticateToken, controller.update);
router.delete('/:id',  authenticateToken, controller.deletaData);

module.exports = router;
