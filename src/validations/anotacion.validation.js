const { z } = require('zod');

const anotacionSchema = z.object({
  alumnoId: z.number(),
  profesorId: z.number(),
  tipo: z.enum(['POSITIVA', 'NEGATIVA', 'NEUTRA']),
  descripcion: z.string(),
  fecha: z.string()
});

module.exports = anotacionSchema;