const { Sequelize } = require('sequelize'); // importa Sequelize para la BD
const dotenv = require('dotenv'); // importa dotenv para leer el .env

dotenv.config(); // carga las variables de entorno de en .env

// crea una instancia de conexión usando la URL de Neon/PostgreSQ
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
  dialect: 'postgres', // indica que la base de datos es PostgreSQL.
  logging: false // desactiva los logs SQL en consola, evita ruido.
});

module.exports = sequelize; // Exporta la conexión para usarla en otros archivos del proyecto.