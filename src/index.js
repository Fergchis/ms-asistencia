const express = require('express'); // importa Express para crear el servidor
const dotenv = require('dotenv'); // importa dotenv para leer el .env

dotenv.config(); // carga las variables de entorno del .env

const app = express(); // crea la app de Express
app.use(express.json()); // permite recibir JSON en las peticiones

// ruta simple para comprobar que el servicio está activo
app.get('/health', (req, res) => {
  res.json({
    status: 'UP', // indica que el servicio está levantado
    service: 'ms-asistencia' // identifica el microservicio
  });
});

// ruta alternativa tipo actuator, similar a Spring Boot
app.get('/actuator/health', (req, res) => {
  res.json({
    status: 'UP', // indica que el servicio está levantado
    service: 'ms-asistencia' // identifica el microservicio
  });
});

const PORT = process.env.PORT || 3000; // usa el puerto del .env o 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`); // muestra el puerto activo en consola
});