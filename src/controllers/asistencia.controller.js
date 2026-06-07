const asistenciaService = require('../services/asistencia.service'); // importa service de asistencia
const asistenciaSchema = require('../validations/asistencia.validation'); // importa validación

// lista todas las asistencias
const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await asistenciaService.obtenerAsistencias();

    res.json(asistencias);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener asistencias'
    });
  }
};

// busca asistencia por id
const obtenerAsistenciaPorId = async (req, res) => {
  try {
    const asistencia = await asistenciaService.obtenerAsistenciaPorId(req.params.id);

    if (!asistencia) {
      return res.status(404).json({
        error: 'Asistencia no encontrada'
      });
    }

    res.json(asistencia);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener asistencia'
    });
  }
};

// crea una asistencia
const crearAsistencia = async (req, res) => {
  try {
    const datos = asistenciaSchema.parse(req.body);

    const asistencia = await asistenciaService.crearAsistencia(datos);

    res.status(201).json(asistencia);
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

// actualiza una asistencia
const actualizarAsistencia = async (req, res) => {
  try {
    const datos = asistenciaSchema.parse(req.body);

    const asistencia = await asistenciaService.actualizarAsistencia(req.params.id, datos);

    if (!asistencia) {
      return res.status(404).json({
        error: 'Asistencia no encontrada'
      });
    }

    res.json(asistencia);
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({
        error: error.message
      });
    }

    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

// bloquea eliminación de asistencia
const eliminarAsistencia = (req, res) => {
  res.status(405).json({
    error: 'No está permitido eliminar asistencias'
  });
};

module.exports = {
  obtenerAsistencias,
  obtenerAsistenciaPorId,
  crearAsistencia,
  actualizarAsistencia,
  eliminarAsistencia
};