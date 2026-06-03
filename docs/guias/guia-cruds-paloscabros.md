# Guía para implementar CRUDs en ms-asistencia

Esta guía define las reglas para implementar nuevos CRUDs dentro del microservicio `ms-asistencia`.

El objetivo es mantener el mismo estilo usado en la API Node del profesor y evitar cambios que rompan la estructura del proyecto.

## Reglas generales

1. Usar CommonJS:
   - `require(...)`
   - `module.exports`
2. No usar:
   - `import`
   - `export default`
3. No instalar dependencias nuevas.
4. No modificar `package.json`.
5. No modificar `src/config/db.js`.
6. No modificar `.env` ni `.env.example`.
7. No usar `sequelize.sync()`.
8. No usar `sequelize.sync({ force: true })`.
9. No crear carpetas nuevas sin avisar.
10. No tocar rutas de otros CRUDs.

## Estructura esperada

Cada CRUD debe tener:

```txt
src/models/NombreModelo.js
src/routes/nombreRuta.js
```

Ejemplo:

```txt
src/models/Asistencia.js
src/routes/asistencias.js
```

## Modelo Sequelize

Cada modelo debe:

- importar `DataTypes` desde `sequelize`;
- importar `sequelize` desde `../config/db`;
- definir `tableName`;
- usar `timestamps: true`;
- exportar el modelo con `module.exports`.

Ejemplo de estructura:

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

## Ruta Express

Cada ruta debe:

- usar `express.Router()`;
- usar `zod` para validar el body;
- importar su modelo correspondiente;
- implementar endpoints REST simples.

Estructura esperada:

```js
const express = require('express');
const { z } = require('zod');
const Modelo = require('../models/Modelo');

const router = express.Router();

const schema = z.object({
  campo: z.string()
});

router.get('/', async (req, res) => {
  try {
    const datos = await Modelo.findAll();

    res.json(datos);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener registros'
    });
  }
});

module.exports = router;
```

## Cambios permitidos en `src/index.js`

Solo se permite agregar el `require` de la ruta y montar la ruta con `app.use`.

Ejemplo:

```js
const justificacionesRoutes = require('./routes/justificaciones');

app.use('/api/justificaciones', justificacionesRoutes);
```

No modificar:

- configuración de Express;
- puerto;
- rutas de otros CRUDs.

## Validaciones mínimas

Cada CRUD debe validar el body con `zod`.

Ejemplo:

```js
const schema = z.object({
  descripcion: z.string(),
  fecha: z.string()
});
```

## Base de datos

Cada CRUD debe tener su script SQL documentado en:

```txt
docs/sql/
```

Ejemplo:

```txt
docs/sql/justificaciones.sql
docs/sql/anotaciones.sql
```

No se debe crear la tabla con `sequelize.sync()`.

## Pruebas manuales requeridas

Cada CRUD debe probar al menos:

```txt
GET    /api/recurso
GET    /api/recurso/:id
POST   /api/recurso
PUT    /api/recurso/:id
DELETE /api/recurso/:id
```

Si por regla de negocio no se permite eliminar, `DELETE` debe responder:

```json
{
  "error": "No está permitido eliminar ..."
}
```

con estado HTTP `405`.

## Flujo Git

Cada integrante debe trabajar en su propia rama desde `develop`.

Ejemplos:

```txt
feature/crud-justificaciones
feature/crud-anotaciones
```

El PR siempre debe apuntar a:

```txt
develop
```

No hacer PR directo a `main`.
