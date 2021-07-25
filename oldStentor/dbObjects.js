const Sequelize = require('sequelize');

const oldsequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const terms = require('./models/terms')(oldsequelize, Sequelize.DataTypes);

console.log(terms.toJSON())
module.exports = {terms}