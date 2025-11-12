const pool = require('../config/db'); 

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
} 
async function updateUser(id_u, user) {
  console.log(user);
  const { id, username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol } = user;
  const [result] = await pool.query('UPDATE users SET username = ?, names = ?, pais = ?, departamento = ?, municipio = ?, email = ?, phone = ?, institute = ?, address = ?, tipo_id = ?, num_id = ?, rol= ? WHERE id = ?', [username, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol, id_u]);
  return result.affectedRows > 0;
}

async function darBajaUser(id_u, data) {
  const {state}=data; 
  
  const [result] = await pool.query('UPDATE users SET state = ? WHERE id = ?', [state, id_u]);
  return result.affectedRows > 0;
}

async function activarUser(id_u, data) { 
 
  const {state}=data;
  console.log(state);
  const [result] = await pool.query('UPDATE users SET state = ? WHERE id = ?', [state, id_u]);
  return result.affectedRows > 0;
}
async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
async function getUserByEmail(email) {
  console.log(email);
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [email]);
  return rows[0];
}

async function createUser(user) {
  console.log(user);
  const { username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol } = user;
  const [result] = await pool.query(
    'INSERT INTO users (username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol]
  );
  return { id: result.insertId, username, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  darBajaUser,
  activarUser,
  deleteUser,
  getUserByEmail
};
