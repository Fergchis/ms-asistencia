const asistenciaRepository = require('../repositories/asistencia.repository'); // repository de asistencia

// dame toas la asistencia
const obtenerAsistencias = async () => {
  return await asistenciaRepository.obtenerAsistencias();
};

// asistencia por id
const obtenerAsistenciaPorId = async (id) => {
  return await asistenciaRepository.obtenerAsistenciaPorId(id);
};

// crear asistencia
const crearAsistencia = async (datos) => {
  return await asistenciaRepository.crearAsistencia(datos);
};

// actualizar asistencia
const actualizarAsistencia = async (id, datos) => {
  const asistencia = await asistenciaRepository.obtenerAsistenciaPorId(id);

  if (!asistencia) {
    return null;
  }

  // Regla de negocio: Solo se puede modificar la asistencia mientras no termine el día
  const hoy = new Date().toISOString().split('T')[0];

  if (asistencia.fecha !== hoy) {
    const error = new Error('No se puede modificar una asistencia de un día pasado');
    error.status = 403;
    throw error;
  }

  return await asistenciaRepository.actualizarAsistencia(asistencia, datos);
};

module.exports = {
  obtenerAsistencias,
  obtenerAsistenciaPorId,
  crearAsistencia,
  actualizarAsistencia
};