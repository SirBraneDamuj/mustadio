const db = require('../db');
const config  = require('../config');
const { DataTypes } = require('sequelize');

const Tournament = db.define('Tournament', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Team = db.define('Team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Tournament.hasMany(Team);
Team.belongsTo(Tournament, {
    foreignKey: {
        allowNull: false,
    },
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
    subSkill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reactSkill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    supportSkill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    moveSkill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Team.hasMany(Unit);
Unit.belongsTo(Team, {
    foreignKey: {
        allowsNull: false,
    },
});

const UnitAbility = db.define('UnitAbility', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mainOrSub: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Unit.hasMany(UnitAbility);
UnitAbility.belongsTo(Unit, {
    foreignKey: {
        allowsNull: false,
    },
});

const UnitEquipment = db.define('UnitEquipment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Unit.hasMany(UnitEquipment);
UnitEquipment.belongsTo(Unit, {
    foreignKey: {
        allowsNull: false,
    },
});

const force = config.FORCE_TABLE_SYNC === 'true';

db.sync({ force }).then(() => console.log('Tables synced!'));

module.exports = {
    Tournament,
    Team,
    Unit,
    UnitAbility,
    UnitEquipment,
};