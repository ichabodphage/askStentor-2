const Discord = require('discord.js');
const Sequelize = require('sequelize');
const stringSimilarity = require('string-similarity');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'newDb.sqlite',
});
const terms = require('./models/words')(sequelize, Sequelize.DataTypes);
function compareValues(key, order = 'asc') {
	return function innerSort(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
		}

		const varA = (typeof a[key] === 'string')
			? a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string')
			? b[key].toUpperCase() : b[key];

		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return (
			(order === 'desc') ? (comparison * -1) : comparison
		);
	};
}
module.exports = {
	name: 'random',
	description: 'Ping!',
	async execute(message, args) {

		var exactWord = global.wordList[Math.floor(Math.random() * Math.floor(global.wordList.length - 1))]
		const describeEmbead = new Discord.MessageEmbed()
		describeEmbead.title = exactWord.name
		describeEmbead.setDescription(`here is a random term from the database`)
		describeEmbead.fields = [
			{ name: `definition`, value: exactWord.longDef, inline: false },
			{ name: `coiner`, value: exactWord.coiner, inline: false },
			{ name: `category`, value: exactWord.category, inline: false }
		]
		message.channel.send(describeEmbead);
	},
};