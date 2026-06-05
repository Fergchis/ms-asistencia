const { DataTypes } = require('sequelize'); // importa los tipos de datos de Sequelize
const sequelize = require('../config/db'); // importa la conexión a la BD

// define el modelo Anotacion y sus campos en la BD
const Anotacion = sequelize.define('Anotacion', {
  id: {
    type: DataTypes.INTEGER, // id como número entero
    primaryKey: true, // id como clave primaria
    autoIncrement: true // genera el id automáticamente
  },
  alumnoId: {
    type: DataTypes.INTEGER, // guarda el id del alumno
    allowNull: false // obliga a que el campo tenga valor
  },
  profesorId: {
    type: DataTypes.INTEGER, // guarda el id del profesor
    allowNull: false // obliga a que el campo tenga valor
  },
  tipo: {
    type: DataTypes.STRING, // guarda el tipo de anotación (ej: POSITIVA, NEGATIVA)
    allowNull: false // obliga a que el campo tenga valor
  },
  descripcion: {
    type: DataTypes.TEXT, // guarda el texto completo de la anotación
    allowNull: false // obliga a que el campo tenga valor
  },
  fecha: {
    type: DataTypes.DATEONLY, // guarda solo la fecha (sin hora)
    allowNull: false // obliga a que el campo tenga valor
  }
}, {
  tableName: 'anotaciones', // define el nombre real de la tabla
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

module.exports = Anotacion; // exporta el modelo para usarlo en otras partes
