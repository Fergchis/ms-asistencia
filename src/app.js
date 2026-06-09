const express = require('express');

const healthRoutes = require('./routes/health');
const asistenciasRoutes = require('./routes/asistencias');
const justificativosRoutes = require('./routes/justificativos');
const anotacionesRoutes = require('./routes/anotaciones');
const mensajesRoutes = require('./routes/mensajes');

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/justificativos', justificativosRoutes);
app.use('/api/anotaciones', anotacionesRoutes);
app.use('/api/mensajes', mensajesRoutes);

module.exports = app;