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
	name: 'def',
	description: 'Ping!',
	async execute(message, args) {
		if (!args.length) {
			message.channel.send("please enter in a word to fetch the definition of")
		} else {
			var exactWord = global.wordList.find(element => element.index === parseInt(args[0]))
			if (exactWord === undefined) {
				var nameAndSimilarityScore = []
				for (var i = 0; i < global.wordList.length; i++) {
					var similarity = stringSimilarity.compareTwoStrings(args[0].toLowerCase(), global.wordList[i].name.toLowerCase())
					nameAndSimilarityScore.push({ name: global.wordList[i], similarity })
				}
				var max = nameAndSimilarityScore.reduce(function (prev, current) {
					return (prev.similarity > current.similarity) ? prev : current
				}) //returns object
				exactWord = max.name.dataValues
				const describeEmbead = new Discord.MessageEmbed()
				describeEmbead.title = exactWord.name
				describeEmbead.setDescription(`here is the most similar term to \"${args[0]}\"`)
				describeEmbead.fields = [
					{ name: `definition`, value: exactWord.longDef, inline: false },
					{ name: `coiner`, value: exactWord.coiner, inline: false },
					{ name: `category`, value: exactWord.category, inline: false }
				]
				message.channel.send(describeEmbead);
			} else {


				const describeEmbead = new Discord.MessageEmbed()
				describeEmbead.title = exactWord.name
				describeEmbead.fields = [
					{ name: `definition`, value: exactWord.longDef, inline: false },
					{ name: `coiner`, value: exactWord.coiner, inline: false },
					{ name: `category`, value: exactWord.category, inline: false }
				]
				message.channel.send(describeEmbead);
			}

		}
	},
};