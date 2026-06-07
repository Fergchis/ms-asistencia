const Anotacion = require('../models/Anotacion');

const obtenerAnotaciones = async () => {
  return await Anotacion.findAll();
};

const obtenerAnotacionPorId = async (id) => {
  return await Anotacion.findByPk(id);
};

const crearAnotacion = async (datos) => {
  return await Anotacion.create(datos);
};

const actualizarAnotacion = async (anotacion, datos) => {
  return await anotacion.update(datos);
};

module.exports = {
  obtenerAnotaciones,
  obtenerAnotacionPorId,
  crearAnotacion,
  actualizarAnotacion
};