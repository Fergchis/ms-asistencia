const express = require('express');
const controller = require('../controllers/mensaje.controller');

const router = express.Router();

// rutas get
router.get('/', controller.obtenerMensajes);
router.get('/:id', controller.obtenerMensajePorId);

// rutas post
router.post('/', controller.crearMensaje);

// rutas put
router.put('/:id', controller.actualizarMensaje);

// rutas delete
router.delete('/:id', controller.eliminarMensaje);

module.exports = router;
