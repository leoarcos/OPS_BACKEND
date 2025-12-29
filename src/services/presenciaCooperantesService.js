const Model = require('../models/presenciaCooperantesModel');

// =========================
// SERVICE: Cooperantes
// =========================

async function getAllData() {
  const [rows] = await Model.getAll();
  return rows;
}

async function getServices() {
  const [rows] = await Model.getServices();
  return rows;
}

async function getDataCooperante(id) {
    
  const [rows] = await Model.getDataCooperante(id);
  return rows;
}

async function getDataById(id) {
  const [rows] = await Model.getById(id);
  return rows[0];
}

async function create(data) {
  const [result] = await Model.create(data);
  
  return {
    id: result.insertId,
    ...data
  };
}

async function update(id, data) {
  const [result] = await Model.update(id, data);
  return result.affectedRows > 0;
}

async function deleteData(id) {
  const [result] = await Model.delete(id);
  return result.affectedRows > 0;
}

module.exports = {
  getAllData,
  getDataById,
  create,
  update,
  deleteData,
  getDataCooperante,
  getServices
};
