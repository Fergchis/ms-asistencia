const express = require('express');
const anotacionController = require('../controllers/anotacion.controller');

const router = express.Router();

router.get('/', anotacionController.obtenerAnotaciones);
router.get('/:id', anotacionController.obtenerAnotacionPorId);
router.post('/', anotacionController.crearAnotacion);
router.put('/:id', anotacionController.actualizarAnotacion);
router.delete('/:id', anotacionController.eliminarAnotacion);

module.exports = router;