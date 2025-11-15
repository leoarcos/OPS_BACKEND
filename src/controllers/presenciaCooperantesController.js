const service = require('../services/presenciaCooperantesService');
  

async function getAllData(req, res) {
  try {
    const data = await service.getAllData();
    res.json(data);
  } catch (err) {
    console.error('Error list cooperantes:', err);
    res.status(500).json({ error: 'Error al obtener presencia cooperantes' });
  }
}

async function getDataById(req, res) {
  const id = req.params.id;
  try {
    const user = await service.getDataById(id);
    if (!user) return res.status(404).json({ error: 'cooperante no encontrado' });
    res.json(user);
  } catch (err) {
    console.error('Error get cooperante presencia :', err);
    res.status(500).json({ error: 'Error al obtener presencia  cooperante' });
  }
}

async function update(req, res) {
  console.log('update');
  const id = req.params.id;
  console.log(req.params);
  try {
    const success = await service.update(id, req.body);
    if (!success) return res.status(404).json({ error: 'Cooperante no encontrado' });
    res.json({ message: 'Cooperante presencia  actualizado' });
  } catch (err) {
    console.error('Error updateUser:', err);
    res.status(500).json({ error: 'Error al actualizar presencia  Cooperante' });
  }
}


async function deletaData(req, res) {
  const id = req.params.id;
  try {
    const success = await service.deleteData(id);
    if (!success) return res.status(404).json({ error: 'Cooperante no encontrado' });
    
    res.json({ message: 'Cooperante presencia  eliminado' });
  } catch (err) {
    console.error('Error deleteCooperantepresencia :', err);
    res.status(500).json({ error: 'Error al eliminar presencia  cooperante' });
  }
}
async function create(req, res) {
  const { id_cooperante, pais, dpto, mnpo, services, address } = req.body;

  try {
     
    const newData = await service.create({
      id_cooperante,
      pais,
      dpto,
      mnpo,
      services,
      address
    });
    res.status(201).json(newData);
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ error: 'Error al registrar presencia   cooperante',  response: err.message });
  }
}

 
module.exports = {
  getAllData,
  getDataById,
  update,
  deletaData,
  create, 
};
