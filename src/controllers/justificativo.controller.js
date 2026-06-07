const justificativoService = require('../services/justificativo.service'); 
const justificativoSchema = require('../validations/justificativo.validation'); 

const obtenerJustificativos = async (req, res) => {
  try {
    const justificativos = await justificativoService.obtenerJustificativos();

    res.json(justificativos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener justificativos'
    });
  }
};

const obtenerJustificativoPorId = async (req, res) => {
  try {
    const justificativo = await justificativoService.obtenerJustificativoPorId(req.params.id);

    if (!justificativo) {
      return res.status(404).json({
        error: 'Justificativo no encontrado'
      });
    }

    res.json(justificativo);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener justificativo'
    });
  }
};

const crearJustificativo = async (req, res) => {
  try {
    const datos = justificativoSchema.parse(req.body);

    const justificativo = await justificativoService.crearJustificativo(datos);

    res.status(201).json(justificativo);
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

const actualizarJustificativo = async (req, res) => {
  try {
    const datos = justificativoSchema.parse(req.body);

    const justificativo = await justificativoService.actualizarJustificativo(req.params.id, datos);

    if (!justificativo) {
      return res.status(404).json({
        error: 'Justificativo no encontrado'
      });
    }

    res.json(justificativo);
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

const eliminarJustificativo = async (req, res) => {
  try {
    await justificativoService.eliminarJustificativo();

    res.json({
      mensaje: 'Justificativo eliminado correctamente'
    });
  } catch (error) {
    if (error.status === 405) {
      return res.status(405).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: 'Error al eliminar justificativo'
    });
  }
};

module.exports = {
  obtenerJustificativos,
  obtenerJustificativoPorId,
  crearJustificativo,
  actualizarJustificativo,
  eliminarJustificativo
};