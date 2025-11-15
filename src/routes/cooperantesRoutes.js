const express = require('express');
const router = express.Router();
const Controller = require('../controllers/cooperantesController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/',  authenticateToken, Controller.getAllData);
router.get('/:id', authenticateToken, Controller.getDataById);
router.post('/register',  authenticateToken, Controller.create);
router.put('/edit/:id', authenticateToken, Controller.update);
router.delete('/:id', authenticateToken,  Controller.deletaData);

module.exports = router;
