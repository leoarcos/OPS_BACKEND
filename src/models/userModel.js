const pool = require('../config/db');

const UserModel = {

  getAll() {
    return pool.query('SELECT * FROM users ORDER BY id DESC');
  },

  getById(id) {
    return pool.query('SELECT * FROM users WHERE id = ?', [id]);
  },

  getByEmail(email) {
    return pool.query('SELECT * FROM users WHERE username = ?', [email]);
  },

  create(user) {
    const { username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol } = user;

    return pool.query(
      `INSERT INTO users 
       (username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, password, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol]
    );
  },

  update(id, user) {
    const { username, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol } = user;

    return pool.query(
      `UPDATE users SET 
         username = ?, names = ?, pais = ?, departamento = ?, municipio = ?, 
         email = ?, phone = ?, institute = ?, address = ?, tipo_id = ?, num_id = ?, rol = ?
       WHERE id = ?`,
      [username, names, pais, departamento, municipio, email, phone, institute, address, tipo_id, num_id, rol, id]
    );
  },

  updateState(id, state) {
    return pool.query(`UPDATE users SET state = ? WHERE id = ?`, [state, id]);
  },

  delete(id) {
    return pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  }

};

module.exports = UserModel;
