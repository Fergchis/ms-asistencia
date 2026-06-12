const mensajeService = require('../services/mensaje.service');
const mensajeSchema = require('../validations/mensaje.validation');

const obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await mensajeService.obtenerMensajes();

    res.json(mensajes);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener mensajes'
    });
  }
};

const obtenerMensajePorId = async (req, res) => {
  try {
    const mensaje = await mensajeService.obtenerMensajePorId(req.params.id);

    if (!mensaje) {
      return res.status(404).json({
        error: 'Mensaje no encontrado'
      });
    }

    res.json(mensaje);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener mensaje'
    });
  }
};

const crearMensaje = async (req, res) => {
  let datos;

  try {
    datos = mensajeSchema.parse(req.body);
  } catch (error) {
    return res.status(400).json({
      error: 'Datos inválidos'
    });
  }

  try {
    const mensaje = await mensajeService.crearMensaje(datos);

    res.status(201).json(mensaje);
  } catch (error) {
    if (error.status === 502) {
      return res.status(502).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: 'Error al crear mensaje'
    });
  }
};

const actualizarMensaje = async (req, res) => {
  let datos;

  try {
    datos = mensajeSchema.parse(req.body);
  } catch (error) {
    return res.status(400).json({
      error: 'Datos inválidos'
    });
  }

  try {
    const mensaje = await mensajeService.actualizarMensaje(req.params.id, datos);

    if (!mensaje) {
      return res.status(404).json({
        error: 'Mensaje no encontrado'
      });
    }

    res.json(mensaje);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar mensaje'
    });
  }
};

const eliminarMensaje = async (req, res) => {
  try {
    await mensajeService.eliminarMensaje();

    res.json({
      mensaje: 'Mensaje eliminado correctamente'
    });
  } catch (error) {
    if (error.status === 405) {
      return res.status(405).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: 'Error al eliminar mensaje'
    });
  }
};

module.exports = {
  obtenerMensajes,
  obtenerMensajePorId,
  crearMensaje,
  actualizarMensaje,
  eliminarMensaje
};