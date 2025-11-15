const pool = require('../config/db');

// =========================
// MODELO: Cooperantes
// =========================

const CooperanteModel = {
  
  getAll() {
    return pool.query('SELECT * FROM cooperantes ORDER BY id DESC');
  },

  getById(id) {
    return pool.query('SELECT * FROM cooperantes WHERE id = ?', [id]);
  },

  create(data) {
    const { names, email_contact, phone_contact, img } = data;
    return pool.query(
      'INSERT INTO cooperantes (names, email_contact, phone_contact, img) VALUES (?, ?, ?, ?)',
      [names, email_contact, phone_contact, img]
    );
  },

  update(id, data) {
    const { names, email_contact, phone_contact, img } = data;
    return pool.query(
      'UPDATE cooperantes SET names = ?, email_contact = ?, phone_contact = ?, img = ? WHERE id = ?',
      [names, email_contact, phone_contact, img, id]
    );
  },

  delete(id) {
    return pool.query('DELETE FROM cooperantes WHERE id = ?', [id]);
  }

};

module.exports = CooperanteModel;
