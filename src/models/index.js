const db = require('./db');
const { DataTypes } = require('sequelize');

const Tournament = db.define('Tournament', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

const Team = db.define('Team', {
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Team.belongsTo(Tournament, {
    allowNull: false,
});


const Unit = db.define('Unit', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zodiac: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brave: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faith: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sub_skill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    react_skill: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    support_skill: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    move_skill: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const UnitEqupment = db.define('UnitEquipment', {
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});