const Sequelize = require('sequelize');
const connection = new Sequelize('mailerdb', 'alexandercleoni', '',{

    host: 'localhost',
    dialect: 'postgres'
});

module.exports = connection;