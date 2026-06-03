const { DataTypes } = require('sequelize'); // importa los tipos de datos de Sequelize
const sequelize = require('../config/db'); // importa la conexión a la BD

// define el modelo Asistencia y sus campos en la BD
const Asistencia = sequelize.define('Asistencia', {
  id: {
    type: DataTypes.INTEGER, // id como número entero
    primaryKey: true, // id como clave primaria
    autoIncrement: true // genera el id automáticamente
  },
  alumnoId: {
    type: DataTypes.INTEGER, // guarda el id del alumno
    allowNull: false // obliga a que el campo tenga valor
  },
  cargaAcademicaId: {
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  fecha: {
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  estado: {
    type: DataTypes.ENUM('PRESENTE', 'AUSENTE', 'JUSTIFICADO'), // limita los estados permitidos
    allowNull: false 
  }
}, {
  tableName: 'asistencias', // define el nombre real de la tabla
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

module.exports = Asistencia;