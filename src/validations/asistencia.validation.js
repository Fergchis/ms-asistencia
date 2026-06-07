const { z } = require('zod'); // zod para validar datos

// reglas de validación
const asistenciaSchema = z.object({
  alumnoId: z.number(), // alumnoId es numero
  cargaAcademicaId: z.number(), // cargaAcademicaId es numero
  fecha: z.string(), // fecha es texto
  estado: z.enum(['PRESENTE', 'AUSENTE', 'JUSTIFICADO']) // limita los estados
});

module.exports = asistenciaSchema; // exportar el schema