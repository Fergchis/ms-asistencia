const { z } = require('zod');

const justificativoSchema = z.object({
  asistenciaId: z.number(), 
  motivo: z.string(), 
  descripcion: z.string(), 
  urlArchivo: z.string().optional(), 
  fechaCarga: z.string() 
});

module.exports = justificativoSchema; 