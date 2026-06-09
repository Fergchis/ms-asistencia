const mensajeRepository = require('../repositories/mensaje.repository');
const emailService = require('./email.service');

const obtenerMensajes = async () => {
  return await mensajeRepository.obtenerMensajes();
};

const obtenerMensajePorId = async (id) => {
  return await mensajeRepository.obtenerMensajePorId(id);
};

const crearMensaje = async (datos) => {
  try {
    await emailService.enviarCorreo({
      destinatario: datos.destinatario,
      asunto: datos.asunto,
      mensaje: datos.mensaje
    });
  } catch (error) {
    const smtpError = new Error('Error al enviar correo');
    smtpError.status = 502;
    throw smtpError;
  }

  return await mensajeRepository.crearMensaje(datos);
};

const actualizarMensaje = async (id, datos) => {
  const mensaje = await mensajeRepository.obtenerMensajePorId(id);

  if (!mensaje) {
    return null;
  }

  return await mensajeRepository.actualizarMensaje(mensaje, datos);
};

const eliminarMensaje = async () => {
  const error = new Error('No está permitido eliminar mensajes');
  error.status = 405;
  throw error;
};

module.exports = {
  obtenerMensajes,
  obtenerMensajePorId,
  crearMensaje,
  actualizarMensaje,
  eliminarMensaje
};