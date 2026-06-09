const express = require('express');
const mensajeController = require('../controllers/mensaje.controller');

const router = express.Router();

router.get('/', mensajeController.obtenerMensajes);
router.get('/:id', mensajeController.obtenerMensajePorId);
router.post('/', mensajeController.crearMensaje);
router.put('/:id', mensajeController.actualizarMensaje);
router.delete('/:id', mensajeController.eliminarMensaje);

module.exports = router;