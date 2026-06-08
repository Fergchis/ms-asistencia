const { z } = require('zod');

const mensajeSchema = z.object({
    alumnoId: z.number().int(),
    profesorId: z.number().int(),
    destinatario: z.string().email(),
    asunto: z.string(),
    mensaje: z.string(),
    tipo: z.enum(['COMUNICACION', 'NOTIFICACION'])
});

module.exports = mensajeSchema;