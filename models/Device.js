const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Device = db.define('Devices',{
    idDevice: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description_device: {
        type: DataTypes.STRING
    },
    serie_number: {
        type: DataTypes.STRING
    },
    device_type: {
        type: DataTypes.STRING
    },
    trademark: {
        type: DataTypes.STRING
    },
    model: {
        type: DataTypes.STRING
    },
    monitor: {
        type: DataTypes.STRING
    },
    perifericos: {
        type: DataTypes.STRING
    },
    storage_device: {
        type: DataTypes.STRING
    },
    ram: {
        type: DataTypes.STRING
    },
    processor: {
        type: DataTypes.INTEGER
    },
    graphic_card: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})



module.exports = Device;