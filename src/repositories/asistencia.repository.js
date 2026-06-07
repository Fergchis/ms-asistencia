const Asistencia = require('../models/Asistencia'); // modelo Asistencia

// dame toas la asistencia
const obtenerAsistencias = async () => {
  return await Asistencia.findAll();
};

// asistencia por id
const obtenerAsistenciaPorId = async (id) => {
  return await Asistencia.findByPk(id);
};

// crear asistencia
const crearAsistencia = async (datos) => {
  return await Asistencia.create(datos);
};

// actualizar asistencia
const actualizarAsistencia = async (asistencia, datos) => {
  return await asistencia.update(datos);
};

module.exports = {
  obtenerAsistencias,
  obtenerAsistenciaPorId,
  crearAsistencia,
  actualizarAsistencia
};