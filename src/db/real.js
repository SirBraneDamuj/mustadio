const { Sequelize } = require('sequelize');
const config = require('../config');

let url = config.DATABASE_URL;
if (url.startsWith("postgres")) {
  url += "?sslmode=require";
}

module.exports = new Sequelize(url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // very important
    }
  },
});

