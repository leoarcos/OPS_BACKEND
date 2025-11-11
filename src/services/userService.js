const pool = require('../config/db'); 

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
} 
async function updateUser(id, user) {
  const { nombre, email, edad } = user;
  const [result] = await pool.query('UPDATE users SET nombre = ?, email = ?, edad = ? WHERE id = ?', [nombre, email, edad, id]);
  return result.affectedRows > 0;
}

async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(user) {
  const { username, password, names, pais, departamento, municipio, email, phone, institute, address } = user;
  const [result] = await pool.query(
    'INSERT INTO users (username, password, names, pais, departamento, municipio, email, phone, institute, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, password, names, pais, departamento, municipio, email, phone, institute, address]
  );
  return { id: result.insertId, username, names, pais, departamento, municipio, email, phone, institute, address };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
