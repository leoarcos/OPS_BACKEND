const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, userController.listUsers);
router.get('/:id',authenticateToken, userController.getUser);
router.post('/register', authenticateToken, userController.createUser);
router.put('/edit/:id',authenticateToken,  userController.updateUser);
router.patch('/baja/:id',authenticateToken,  userController.darBajaUser);
router.patch('/activar/:id',authenticateToken,  userController.activarUser);
router.delete('/:id',authenticateToken,  userController.deleteUser);
router.post('/login', userController.login); // Ruta para login

module.exports = router;
