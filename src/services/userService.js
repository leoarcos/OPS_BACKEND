const UserModel = require('../models/userModel');

async function getAllUsers() {
  const [rows] = await UserModel.getAll();
  return rows;
}

async function getUserById(id) {
  const [rows] = await UserModel.getById(id);
  return rows[0];
}

async function getUserByEmail(email) {
  const [rows] = await UserModel.getByEmail(email);
  return rows[0];
}

async function createUser(user) {
  const [result] = await UserModel.create(user);

  return {
    id: result.insertId,
    ...user
  };
}

async function updateUser(id, user) {
  const [result] = await UserModel.update(id, user);
  return result.affectedRows > 0;
}

async function darBajaUser(id, data) {
  const { state } = data;
  const [result] = await UserModel.updateState(id, state);
  return result.affectedRows > 0;
}

async function activarUser(id, data) {
  const { state } = data;
  const [result] = await UserModel.updateState(id, state);
  return result.affectedRows > 0;
}

async function deleteUser(id) {
  const [result] = await UserModel.delete(id);
  return result.affectedRows > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  darBajaUser,
  activarUser,
  deleteUser
};
