const anotacionRepository = require('../repositories/anotacion.repository');

const obtenerAnotaciones = async () => {
  return await anotacionRepository.obtenerAnotaciones();
};

const obtenerAnotacionPorId = async (id) => {
  return await anotacionRepository.obtenerAnotacionPorId(id);
};

const crearAnotacion = async (datos) => {
  return await anotacionRepository.crearAnotacion(datos);
};

const actualizarAnotacion = async (id, datos) => {
  const anotacion = await anotacionRepository.obtenerAnotacionPorId(id);

  if (!anotacion) {
    return null;
  }

  return await anotacionRepository.actualizarAnotacion(anotacion, datos);
};

const eliminarAnotacion = async () => {
  const error = new Error('No está permitido eliminar anotaciones');
  error.status = 405;
  throw error;
};

module.exports = {
  obtenerAnotaciones,
  obtenerAnotacionPorId,
  crearAnotacion,
  actualizarAnotacion,
  eliminarAnotacion
};