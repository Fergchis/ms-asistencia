const express = require('express'); // importa Express para manejar rutas
const router = express.Router(); // crea el router de asistencias
const asistenciaService = require('../services/asistencia.service'); // importa service de asistencia
const asistenciaSchema = require('../validations/asistencia.validation'); // importa validación

// lista todas las asistencias
router.get('/', async (req, res) => {
  try {
    const asistencias = await asistenciaService.obtenerAsistencias(); // obtiene los registros

    res.json(asistencias); // responde con la lista de asistencias
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener asistencias'
    });
  }
});

// busca asistencia por id
router.get('/:id', async (req, res) => {
  try {
    const asistencia = await asistenciaService.obtenerAsistenciaPorId(req.params.id); // busca por id

    if (!asistencia) {
      return res.status(404).json({
        error: 'Asistencia no encontrada' // responde si no existe
      });
    }

    res.json(asistencia); // responde con la asistencia encontrada
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener asistencia' // error del servidor
    });
  }
});

// crea una asistencia
router.post('/', async (req, res) => {
  try {
    const datos = asistenciaSchema.parse(req.body); // valida el body recibido

    const asistencia = await asistenciaService.crearAsistencia(datos); // crea el registro en la BD

    res.status(201).json(asistencia); // responde con el registro creado
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos' // responde si falla
    });
  }
});

// actualiza una asistencia
router.put('/:id', async (req, res) => {
  try {
    const datos = asistenciaSchema.parse(req.body); // valida el body recibido

    const asistencia = await asistenciaService.actualizarAsistencia(req.params.id, datos); // actualiza registro

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
});

// elimina asistencia por id
router.delete('/:id', (req, res) => {
  res.status(405).json({
    error: 'No está permitido eliminar asistencias'
  });
});

module.exports = router;