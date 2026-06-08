const repository = require('../repositories/mensaje.repository');

// obtiene todos los mensajes
const obtenerMensajes = async () => {
  return await repository.obtenerMensajes();
};

// obtiene un mensaje por id
const obtenerMensajePorId = async (id) => {
  return await repository.obtenerMensajePorId(id);
};

// crea un nuevo mensaje
const crearMensaje = async (datos) => {
  const emailService = require('../services/email.service');

  // intentamos enviar el correo
  const correoEnviado = await emailService.enviarCorreo(datos.destinatario, datos.asunto, datos.mensaje);

  // si falla, lanzamos un error y detenemos el flujo
  if (!correoEnviado) {
    const error = new Error('No se pudo enviar el correo al servidor SMTP');
    error.status = 500;
    throw error;
  }
  // si se envio el correo entonces guardamos el mensaje
  return await repository.crearMensaje(datos);
};

// actualiza un mensaje
const actualizarMensaje = async (id, datos) => {
  const mensaje = await repository.obtenerMensajePorId(id);
  if (!mensaje) {
    return null;
  }
  return await repository.actualizarMensaje(mensaje, datos);
};

module.exports = {
  obtenerMensajes,
  obtenerMensajePorId,
  crearMensaje,
  actualizarMensaje
};
