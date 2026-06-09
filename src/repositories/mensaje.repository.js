const Mensaje = require('../models/Mensaje');

const obtenerMensajes = async () => {
  return await Mensaje.findAll();
};

const obtenerMensajePorId = async (id) => {
  return await Mensaje.findByPk(id);
};

const crearMensaje = async (datos) => {
  return await Mensaje.create(datos);
};

const actualizarMensaje = async (mensaje, datos) => {
  return await mensaje.update(datos);
};

module.exports = {
  obtenerMensajes,
  obtenerMensajePorId,
  crearMensaje,
  actualizarMensaje
};