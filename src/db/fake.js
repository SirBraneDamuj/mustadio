const sequelize = require('sequelize');

module.exports = new sequelize('sqlite://memory.sqlite')