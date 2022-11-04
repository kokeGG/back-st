const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Assignment = db.define('Assignments',{
    idAssignment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUser: {
        type: DataTypes.INTEGER
    },
    idDevice: {
        type: DataTypes.INTEGER
    },
    manager: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})



module.exports = Assignment;