const express = require('express'); // importa Express para manejar rutas
const { z } = require('zod'); // importa zod para validar datos
const Justificativo = require('../models/Justificativo'); // importa el modelo Justificativo

const router = express.Router(); // crea el router de justificativos

// define reglas de validación para justificativos
const schema = z.object({
  asistenciaId: z.number(), // valida que asistenciaId sea número
  urlCloudStorage: z.string().url(), // valida que urlCloudStorage sea una URL válida
  fechaCarga: z.string() // valida que fechaCarga sea texto
});

// lista todos los justificativos
router.get('/', async (req, res) => {
  try {
    const datos = await Justificativo.findAll(); // obtiene los registros
    res.json(datos); // responde con la lista
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros' }); // error del servidor
  }
});

// busca justificativo por id
router.get('/:id', async (req, res) => {
  try {
    const registro = await Justificativo.findByPk(req.params.id); // busca por id
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' }); // responde si no existe
    res.json(registro); // responde con el registro encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registro' }); // error del servidor
  }
});

// crea un justificativo
router.post('/', async (req, res) => {
  try {
    const datos = schema.parse(req.body); // valida el body recibido
    const registro = await Justificativo.create(datos); // crea el registro en la BD
    // TODO: Lógica de negocio (Especifico): Notificar al alumno para que adjunte justificativo.
    res.status(201).json(registro); // responde con el registro creado
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' }); // responde si falla
  }
});

// actualiza un justificativo
router.put('/:id', async (req, res) => {
  try {
    const datos = schema.parse(req.body); // valida el body recibido
    const registro = await Justificativo.findByPk(req.params.id); // busca registro por id
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' }); // responde si no existe
    
    await registro.update(datos); // actualiza registro con los datos nuevos
    res.json(registro); // responde con registro actualizado
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' }); // responde si falla
  }
});

// elimina justificativo por id
router.delete('/:id', (req, res) => {
  res.status(405).json({ error: 'No está permitido eliminar justificativos' }); // no permite eliminar
});

module.exports = router; // exporta el router
