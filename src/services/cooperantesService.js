const CooperanteModel = require('../models/cooperantesModel');

// =========================
// SERVICE: Cooperantes
// =========================

async function getAllData() {
  const [rows] = await CooperanteModel.getAll();
  return rows;
}

async function getDataById(id) {
  const [rows] = await CooperanteModel.getById(id);
  return rows[0];
}

async function create(data) {
  const [result] = await CooperanteModel.create(data);
  
  return {
    id: result.insertId,
    ...data
  };
}

async function update(id, data) {
  const [result] = await CooperanteModel.update(id, data);
  return result.affectedRows > 0;
}

async function deleteData(id) {
  const [result] = await CooperanteModel.delete(id);
  return result.affectedRows > 0;
}

module.exports = {
  getAllData,
  getDataById,
  create,
  update,
  deleteData
};
