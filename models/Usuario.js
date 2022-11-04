const { DataTypes, DATE } = require('sequelize')
const db = require('../config/db')

const User = db.define('Users',{
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paternal_surname: {
        type: DataTypes.STRING
    },
    maternal_surname: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    date_birth: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING
    },
    
}, {
    timestamps: false
})



module.exports = User;