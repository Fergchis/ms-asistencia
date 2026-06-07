const express = require('express'); // importa Express para manejar rutas
const asistenciaController = require('../controllers/asistencia.controller'); // importa controller de asistencia

const router = express.Router(); // crea el router de asistencias

router.get('/', asistenciaController.obtenerAsistencias);
router.get('/:id', asistenciaController.obtenerAsistenciaPorId);
router.post('/', asistenciaController.crearAsistencia);
router.put('/:id', asistenciaController.actualizarAsistencia);
router.delete('/:id', asistenciaController.eliminarAsistencia);

module.exports = router;