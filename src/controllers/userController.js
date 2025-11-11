const userService = require('../services/userService');
const { getIO } = require('../socket');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');


async function listUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error listUsers:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error('Error getUser:', err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

async function createUser(req, res) {
  const { username, password, names, pais, departamento, municipio, email, phone, institute, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing de la contraseña
    const newUser = await userService.createUser({
      username,
      password: hashedPassword,
      names,
      pais,
      departamento,
      municipio,
      email,
      phone,
      institute,
      address
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  try {
    const success = await userService.updateUser(id, req.body);
    if (!success) return res.status(404).json({ error: 'Usuario no encontrado' });
    getIO().emit('userChanged');
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    console.error('Error updateUser:', err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const success = await userService.deleteUser(id);
    if (!success) return res.status(404).json({ error: 'Usuario no encontrado' });
    getIO().emit('userChanged');
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error('Error deleteUser:', err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login
};
