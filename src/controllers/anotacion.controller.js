const anotacionService = require('../services/anotacion.service');
const anotacionSchema = require('../validations/anotacion.validation');

const obtenerAnotaciones = async (req, res) => {
  try {
    const anotaciones = await anotacionService.obtenerAnotaciones();

    res.json(anotaciones);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener anotaciones'
    });
  }
};

const obtenerAnotacionPorId = async (req, res) => {
  try {
    const anotacion = await anotacionService.obtenerAnotacionPorId(req.params.id);

    if (!anotacion) {
      return res.status(404).json({
        error: 'Anotación no encontrada'
      });
    }

    res.json(anotacion);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener anotación'
    });
  }
};

const crearAnotacion = async (req, res) => {
  try {
    const datos = anotacionSchema.parse(req.body);

    const anotacion = await anotacionService.crearAnotacion(datos);

    res.status(201).json(anotacion);
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

const actualizarAnotacion = async (req, res) => {
  try {
    const datos = anotacionSchema.parse(req.body);

    const anotacion = await anotacionService.actualizarAnotacion(req.params.id, datos);

    if (!anotacion) {
      return res.status(404).json({
        error: 'Anotación no encontrada'
      });
    }

    res.json(anotacion);
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

const eliminarAnotacion = async (req, res) => {
  try {
    await anotacionService.eliminarAnotacion();

    res.json({
      mensaje: 'Anotación eliminada correctamente'
    });
  } catch (error) {
    if (error.status === 405) {
      return res.status(405).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: 'Error al eliminar anotación'
    });
  }
};

module.exports = {
  obtenerAnotaciones,
  obtenerAnotacionPorId,
  crearAnotacion,
  actualizarAnotacion,
  eliminarAnotacion
};