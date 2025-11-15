const cooperantesService = require('../services/cooperantesService');
  

async function getAllData(req, res) {
  try {
    const data = await cooperantesService.getAllData();
    res.json(data);
  } catch (err) {
    console.error('Error list cooperantes:', err);
    res.status(500).json({ error: 'Error al obtener cooperantes' });
  }
}

async function getDataById(req, res) {
  const id = req.params.id;
  try {
    const user = await cooperantesService.getDataById(id);
    if (!user) return res.status(404).json({ error: 'cooperante no encontrado' });
    res.json(user);
  } catch (err) {
    console.error('Error get cooperante:', err);
    res.status(500).json({ error: 'Error al obtener cooperante' });
  }
}

async function update(req, res) {
  console.log('update');
  const id = req.params.id;
  console.log(req.params);
  try {
    const success = await cooperantesService.update(id, req.body);
    if (!success) return res.status(404).json({ error: 'Cooperante no encontrado' });
    res.json({ message: 'Cooperante actualizado' });
  } catch (err) {
    console.error('Error updateUser:', err);
    res.status(500).json({ error: 'Error al actualizar Cooperante' });
  }
}


async function deletaData(req, res) {
  const id = req.params.id;
  try {
    const success = await cooperantesService.deleteData(id);
    if (!success) return res.status(404).json({ error: 'Cooperante no encontrado' });
    
    res.json({ message: 'Cooperante eliminado' });
  } catch (err) {
    console.error('Error deleteCooperante:', err);
    res.status(500).json({ error: 'Error al eliminar cooperante' });
  }
}
async function create(req, res) {
  const { names, email_contact, phone_contact, img } = req.body;

  try {
     
    const newData = await cooperantesService.create({
      names,
      email_contact,
      phone_contact,
      img
    });
    res.status(201).json(newData);
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ error: 'Error al registrar cooperante',  response: err.message });
  }
}

 
module.exports = {
  getAllData,
  getDataById,
  update,
  deletaData,
  create, 
};
