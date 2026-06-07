const express = require('express'); // importa Express para manejar rutas
const Asistencia = require('../models/Asistencia'); // importa el modelo Asistencia
const router = express.Router(); // crea el router de asistencias
const asistenciaSchema = require('../validations/asistencia.validation'); // importa validación

// lista todas las asistencias
router.get('/', async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll(); // obtiene los registros

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
    const asistencia = await Asistencia.findByPk(req.params.id); // busca por id

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

    const asistencia = await Asistencia.create(datos); // crea el registro en la BD

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

    const asistencia = await Asistencia.findByPk(req.params.id); // busca registro por id

    if (!asistencia) {
      return res.status(404).json({
        error: 'Asistencia no encontrada' // responde si no existe
      });
    }

    // Regla de negocio: Solo se puede modificar la asistencia mientras no termine el día
    const hoy = new Date().toISOString().split('T')[0]; //se obtiene solo la primera parte de la fecha [0]
    if (asistencia.fecha !== hoy) {
      return res.status(403).json({
        error: 'No se puede modificar una asistencia de un día pasado'
      });
    }

    await asistencia.update(datos); // actualiza registro con los datos nuevos

    res.json(asistencia); // responde con registro actualizado
  } catch (error) {
    res.status(400).json({
      error: 'Datos inválidos' // responde si falla
    });
  }
});

// elimina asistencia por id (MENTIRA WAJAW)
router.delete('/:id', (req, res) => {
  res.status(405).json({
    error: 'No está permitido eliminar asistencias'
  });
});

module.exports = router;