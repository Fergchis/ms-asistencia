const express = require('express'); // importa Express para crear el servidor
const dotenv = require('dotenv'); // importa dotenv para leer el .env
const healthRoutes = require('./routes/health'); // importa las rutas de health
const asistenciasRoutes = require('./routes/asistencias'); // importa las rutas de asistencias
const justificativosRoutes = require('./routes/justificativos'); // importa las rutas de justificativos
const anotacionesRoutes = require('./routes/anotaciones'); // importa las rutas de anotaciones

dotenv.config(); // carga las variables de entorno del .env

const app = express(); // crea la app de Express
app.use(express.json()); // permite recibir JSON en las peticiones

// registra las rutas
app.use('/', healthRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/justificativos', justificativosRoutes);
app.use('/api/anotaciones', anotacionesRoutes);

const PORT = process.env.PORT || 3000; // usa el puerto del .env o 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`); // muestra el puerto activo en consola
});