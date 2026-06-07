const Justificativo = require('../models/Justificativo'); // importa el modelo Justificativo

// obtiene todos los justificativos
const obtenerJustificativos = async () => {
  return await Justificativo.findAll();
};

// obtiene un justificativo por id
const obtenerJustificativoPorId = async (id) => {
  return await Justificativo.findByPk(id);
};

// crea un justificativo
const crearJustificativo = async (datos) => {
  return await Justificativo.create(datos);
};

// actualiza un justificativo
const actualizarJustificativo = async (justificativo, datos) => {
  return await justificativo.update(datos);
};

module.exports = {
  obtenerJustificativos,
  obtenerJustificativoPorId,
  crearJustificativo,
  actualizarJustificativo
};