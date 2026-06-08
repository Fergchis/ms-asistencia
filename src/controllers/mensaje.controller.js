const service = require('../services/mensaje.service');
const schema = require('../validations/mensaje.validation');

// obtiene todos los mensajes
const obtenerMensajes = async (req, res) => {
  try {
    const datos = await service.obtenerMensajes();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};

// obtiene un mensaje por id
const obtenerMensajePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = await service.obtenerMensajePorId(id);
    if (!datos) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
};

// crea un nuevo mensaje
const crearMensaje = async (req, res) => {
  try {
    const datos = schema.parse(req.body);
    const nuevoMensaje = await service.crearMensaje(datos);
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.error("Error capturado en crearMensaje:", error);
    res.status(400).json({ error: error.errors || 'Error al crear el mensaje' });
  }
};

// actualiza un mensaje
const actualizarMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = schema.parse(req.body);
    const mensajeActualizado = await service.actualizarMensaje(id, datos);
    if (!mensajeActualizado) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(mensajeActualizado);
  } catch (error) {
    res.status(400).json({ error: error.errors || 'Error al actualizar el mensaje' });
  }
};

// bloquea eliminación de mensaje
const eliminarMensaje = (req, res) => {
  //si no se puede eliminar se responde 405
  res.status(405).json({
    error: 'No está permitido eliminar este recurso (historial inmutable)'
  });
};

module.exports = {
  obtenerMensajes,
  obtenerMensajePorId,
  crearMensaje,
  actualizarMensaje,
  eliminarMensaje
};
