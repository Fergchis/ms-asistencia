const express = require('express');
const justificativoController = require('../controllers/justificativo.controller');

const router = express.Router();

router.get('/', justificativoController.obtenerJustificativos);
router.get('/:id', justificativoController.obtenerJustificativoPorId);
router.post('/', justificativoController.crearJustificativo);
router.put('/:id', justificativoController.actualizarJustificativo);
router.delete('/:id', justificativoController.eliminarJustificativo);

module.exports = router;