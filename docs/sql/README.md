# SQL del microservicio ms-asistencia

Este directorio contiene los scripts SQL utilizados para preparar las tablas del microservicio `ms-asistencia`.

## Scripts disponibles

### `asistencias.sql`

Crea la tabla `asistencias`, utilizada por el CRUD de asistencia.

Campos principales:

- `id`: identificador del registro.
- `alumnoId`: referencia al alumno existente en `ms-gestion-academica`.
- `cargaAcademicaId`: referencia a la carga académica existente en `ms-gestion-academica`.
- `fecha`: fecha de la asistencia.
- `estado`: estado de asistencia. Valores permitidos:
  - `PRESENTE`
  - `AUSENTE`
  - `JUSTIFICADO`
- `createdAt`: fecha de creación del registro.
- `updatedAt`: fecha de última actualización del registro.

## Nota técnica

Las columnas `"alumnoId"`, `"cargaAcademicaId"`, `"createdAt"` y `"updatedAt"` usan comillas porque Sequelize consulta esos campos en formato camelCase.

En PostgreSQL, si no se usan comillas, los nombres de columnas se transforman a minúsculas.