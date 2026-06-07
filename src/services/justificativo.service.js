const justificativoRepository = require('../repositories/justificativo.repository'); 

const obtenerJustificativos = async () => {
  return await justificativoRepository.obtenerJustificativos();
};

const obtenerJustificativoPorId = async (id) => {
  return await justificativoRepository.obtenerJustificativoPorId(id);
};

const crearJustificativo = async (datos) => {
  return await justificativoRepository.crearJustificativo(datos);
};

const actualizarJustificativo = async (id, datos) => {
  const justificativo = await justificativoRepository.obtenerJustificativoPorId(id);

  if (!justificativo) {
    return null;
  }

  return await justificativoRepository.actualizarJustificativo(justificativo, datos);
};

const eliminarJustificativo = async () => {
  const error = new Error('No está permitido eliminar justificativos');
  error.status = 405;
  throw error;
};

module.exports = {
  obtenerJustificativos,
  obtenerJustificativoPorId,
  crearJustificativo,
  actualizarJustificativo,
  eliminarJustificativo
};