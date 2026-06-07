const Justificativo = require('../models/Justificativo'); 

const obtenerJustificativos = async () => {
  return await Justificativo.findAll();
};

const obtenerJustificativoPorId = async (id) => {
  return await Justificativo.findByPk(id);
};

const crearJustificativo = async (datos) => {
  return await Justificativo.create(datos);
};

const actualizarJustificativo = async (justificativo, datos) => {
  return await justificativo.update(datos);
};

module.exports = {
  obtenerJustificativos,
  obtenerJustificativoPorId,
  crearJustificativo,
  actualizarJustificativo
};