# Guía breve para implementar CRUDs en `ms-asistencia`

Esta guía define cómo agregar nuevos CRUDs sin romper la estructura actual del microservicio. La prioridad es mantener el estilo del proyecto y la arquitectura por capas usada en `Asistencia`.

## Reglas base

- Usar CommonJS: `require(...)` y `module.exports`.
- No usar `import` ni `export default`.
- No instalar dependencias nuevas.
- No modificar `package.json`, `pnpm-lock.yaml`, `.env`, `.env.example` ni `src/config/db.js`.
- No usar `sequelize.sync()` ni `sequelize.sync({ force: true })`.
- No tocar archivos de otros CRUDs.
- No hacer PR directo a `main`; todo PR debe ir hacia `develop`.

## Estructura obligatoria por CRUD

Cada CRUD debe seguir esta estructura:

```txt
src/models/NombreModelo.js
src/validations/nombre.validation.js
src/repositories/nombre.repository.js
src/services/nombre.service.js
src/controllers/nombre.controller.js
src/routes/nombres.js
docs/sql/nombres.sql
```

Ejemplo con asistencia:

```txt
src/models/Asistencia.js
src/validations/asistencia.validation.js
src/repositories/asistencia.repository.js
src/services/asistencia.service.js
src/controllers/asistencia.controller.js
src/routes/asistencias.js
docs/sql/asistencias.sql
```

## Responsabilidad de cada capa

| Capa | Responsabilidad |
|---|---|
| `model` | Define el modelo Sequelize y la tabla asociada. |
| `validation` | Define validaciones con Zod. |
| `repository` | Accede a la base de datos usando Sequelize. |
| `service` | Contiene reglas de negocio. |
| `controller` | Maneja `req`, `res`, códigos HTTP y errores. |
| `routes` | Solo declara endpoints y llama al controller. |
| `docs/sql` | Documenta el SQL usado para crear la tabla. |

## Modelo Sequelize

Cada modelo debe:

- importar `DataTypes` desde `sequelize`;
- importar `sequelize` desde `../config/db`;
- definir `tableName`;
- usar `timestamps: true`;
- exportar con `module.exports`.

Ejemplo mínimo:

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NombreModelo = sequelize.define('NombreModelo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  tableName: 'nombre_tabla',
  timestamps: true
});

module.exports = NombreModelo;
```

## Validación con Zod

Cada CRUD debe validar el body antes de crear o actualizar datos.

Ejemplo:

```js
const { z } = require('zod');

const nombreSchema = z.object({
  descripcion: z.string(),
  fecha: z.string()
});

module.exports = nombreSchema;
```

## Repository

El repository solo debe comunicarse con Sequelize. No debe manejar `req`, `res` ni códigos HTTP.

Ejemplo:

```js
const Modelo = require('../models/Modelo');

const obtenerRegistros = async () => {
  return await Modelo.findAll();
};

const obtenerRegistroPorId = async (id) => {
  return await Modelo.findByPk(id);
};

module.exports = {
  obtenerRegistros,
  obtenerRegistroPorId
};
```

## Service

El service debe usar el repository y concentrar reglas de negocio. No debe manejar `res.status(...)`.

Ejemplo:

```js
const repository = require('../repositories/nombre.repository');

const obtenerRegistros = async () => {
  return await repository.obtenerRegistros();
};

module.exports = {
  obtenerRegistros
};
```

## Controller

El controller recibe `req` y `res`, llama al service y responde con el código HTTP correspondiente.

Ejemplo:

```js
const service = require('../services/nombre.service');
const schema = require('../validations/nombre.validation');

const obtenerRegistros = async (req, res) => {
  try {
    const datos = await service.obtenerRegistros();
    res.json(datos);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener registros'
    });
  }
};

module.exports = {
  obtenerRegistros
};
```

## Routes

Las rutas deben quedar limpias: solo definen endpoints y llaman al controller.

Ejemplo:

```js
const express = require('express');
const controller = require('../controllers/nombre.controller');

const router = express.Router();

router.get('/', controller.obtenerRegistros);
router.get('/:id', controller.obtenerRegistroPorId);
router.post('/', controller.crearRegistro);
router.put('/:id', controller.actualizarRegistro);
router.delete('/:id', controller.eliminarRegistro);

module.exports = router;
```

## Cambios permitidos en `src/index.js`

Solo se permite importar la nueva ruta y montarla con `app.use`.

Ejemplo:

```js
const justificacionesRoutes = require('./routes/justificaciones');

app.use('/api/justificaciones', justificacionesRoutes);
```

No modificar configuración de Express, puerto, health checks ni rutas de otros CRUDs.

## Base de datos

Cada CRUD debe incluir su SQL en `docs/sql/`.

Ejemplos:

```txt
docs/sql/justificaciones.sql
docs/sql/anotaciones.sql
```

Las tablas se crean manualmente en Neon usando el SQL documentado. No se deben crear desde código con `sequelize.sync()`.

## DELETE y reglas de negocio

Si el recurso no debe eliminarse por regla de negocio, mantener el endpoint pero responder `405`.

Ejemplo:

```js
const eliminarRegistro = (req, res) => {
  res.status(405).json({
    error: 'No está permitido eliminar este recurso'
  });
};
```

## Pruebas manuales mínimas

Cada CRUD debe probar:

```txt
GET    /api/recurso
GET    /api/recurso/:id
POST   /api/recurso
PUT    /api/recurso/:id
DELETE /api/recurso/:id
```

Además, verificar que el servicio siga respondiendo:

```txt
GET /health
GET /actuator/health
```

## Flujo Git

Cada integrante debe trabajar en su propia rama desde `develop` actualizado.

Ejemplos:

```txt
feature/crud-justificaciones
feature/crud-anotaciones
```

Antes de abrir PR:

```txt
git status
git log --oneline -5
```

El PR debe apuntar siempre a `develop`.
