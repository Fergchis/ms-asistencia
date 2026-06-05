const express = require('express'); // importa Express para manejar rutas
const { z } = require('zod'); // importa zod para validar datos
const Anotacion = require('../models/Anotacion'); // importa el modelo Anotacion

const router = express.Router(); // crea el router de anotaciones

// define reglas de validación para anotaciones
const schema = z.object({
  alumnoId: z.number(), // valida que alumnoId sea número
  profesorId: z.number(), // valida que profesorId sea número
  tipo: z.string(), // valida que tipo sea texto
  descripcion: z.string(), // valida que descripcion sea texto
  fecha: z.string() // valida que fecha sea texto
});

// lista todas las anotaciones
router.get('/', async (req, res) => {
  try {
    const datos = await Anotacion.findAll(); // obtiene los registros
    res.json(datos); // responde con la lista
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros' }); // error del servidor
  }
});

// busca anotacion por id
router.get('/:id', async (req, res) => {
  try {
    const registro = await Anotacion.findByPk(req.params.id); // busca por id
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' }); // responde si no existe
    res.json(registro); // responde con el registro encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registro' }); // error del servidor
  }
});

// crea una anotacion
router.post('/', async (req, res) => {
  try {
    const datos = schema.parse(req.body); // valida el body recibido
    const registro = await Anotacion.create(datos); // crea el registro en la BD
    res.status(201).json(registro); // responde con el registro creado
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' }); // responde si falla
  }
});

// actualiza una anotacion
router.put('/:id', async (req, res) => {
  try {
    const datos = schema.parse(req.body); // valida el body recibido
    const registro = await Anotacion.findByPk(req.params.id); // busca registro por id
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' }); // responde si no existe
    
    await registro.update(datos); // actualiza registro con los datos nuevos
    res.json(registro); // responde con registro actualizado
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' }); // responde si falla
  }
});

// elimina anotacion por id
router.delete('/:id', (req, res) => {
  res.status(405).json({ error: 'No está permitido eliminar anotaciones' }); // no permite eliminar
});

module.exports = router; // exporta el router
