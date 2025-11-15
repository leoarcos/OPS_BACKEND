const pool = require('../config/db');

// =========================
// MODELO: presencia_cooperantes
// =========================

const PresenciaCooperanteModel = {
  
  getAll() {
    return pool.query('SELECT * FROM presencia_cooperantes ORDER BY id DESC');
  },

  getById(id) {
    return pool.query('SELECT * FROM presencia_cooperantes WHERE id = ?', [id]);
  },

  create(data) {
    const { id_cooperante, pais, dpto, mnpo, services, address } = data;
    return pool.query(
      'INSERT INTO presencia_cooperantes (id_cooperante, pais, dpto, mnpo, services, address) VALUES (?, ?, ?, ?, ?, ?)',
      [id_cooperante, pais, dpto, mnpo, services, address]
    );
  },

  update(id, data) {
    const { id_cooperante, pais, dpto, mnpo, services, address } = data;
    return pool.query(
      'UPDATE presencia_cooperantes SET pais = ?, dpto = ?, mnpo = ?, services = ?, address = ? WHERE id = ?',
      [pais, dpto, mnpo, services, address, id]
    );
  },

  delete(id) {
    return pool.query('DELETE FROM presencia_cooperantes WHERE id = ?', [id]);
  }

};

module.exports = PresenciaCooperanteModel;
