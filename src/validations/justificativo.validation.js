const { z } = require('zod'); // importa zod para validar datos

// define las reglas de validación para justificativo
const justificativoSchema = z.object({
  asistenciaId: z.number(), // valida que asistenciaId sea número
  motivo: z.string(), // valida que motivo sea texto
  descripcion: z.string(), // valida que descripcion sea texto
  urlArchivo: z.string().optional(), // valida que urlArchivo sea texto opcional
  fechaCarga: z.string() // valida que fechaCarga sea texto
});

module.exports = justificativoSchema; // exporta el schema para usarlo en otras capas