const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './variables.env' })

const db = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
});



module.exports = db;