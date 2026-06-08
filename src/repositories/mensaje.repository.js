const Mensaje = require('../models/Mensaje');

// obtiene todos los mensajes
const obtenerMensajes = async () => {
    return await Mensaje.findAll();
};

// obtiene un mensaje por id
const obtenerMensajePorId = async (id) => {
    return await Mensaje.findByPk(id);
};

// crea un mensaje
const crearMensaje = async (datos) => {
    return await Mensaje.create(datos);
};

// actualiza un mensaje
const actualizarMensaje = async (mensaje, datos) => {
    return await mensaje.update(datos);
};

module.exports = {
    obtenerMensajes,
    obtenerMensajePorId,
    crearMensaje,
    actualizarMensaje
};