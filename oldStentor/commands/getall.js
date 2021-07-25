const Discord = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'newDb.sqlite',
});
const terms = require('./models/words')(sequelize, Sequelize.DataTypes);
Array.prototype.frequencies = function () {
	var l = this.length, result = { all: [] };
	while (l--) {
		result[this[l]] = result[this[l]] ? ++result[this[l]] : 1;
	}
	// all pairs (label, frequencies) to an array of arrays(2)
	for (var l in result) {
		if (result.hasOwnProperty(l) && l !== 'all') {
			result.all.push([l, result[l]]);
		}
	}
	return result;
};

module.exports = {
	name: 'getall',
	description: 'Ping!',
	async execute(message, args) {

		let nameOut = global.wordList.map(item => `${item.category}`)
		if (args[0] === undefined) {
			var pushOne = nameOut.frequencies()
			console.log(pushOne)
			const describeEmbead = new Discord.MessageEmbed()
			describeEmbead.title = "amount of words in each category"
			describeEmbead.setDescription('to get the words in a category, use the ask;getall Command with the name of the category you want to get from along with the page number.\nex: ask;getall member-type')
			describeEmbead.fields = []
			for (var i = 0; i < pushOne.all.length; i++) {
				describeEmbead.fields.push({ name: pushOne.all[i][0], value: pushOne.all[i][1] +"\n"+Math.ceil(pushOne.all[i][1]/10) + " pages", inline: false })
			}
			message.channel.send(describeEmbead);
		} else {
			var termsOut = global.wordList.filter(element => element.category === args[0])
			console.log(termsOut)
			if (termsOut === undefined) {
				message.channel.send(`sorry, but \"${args[0]}\" is not a category you can search from`);
			} else {

				const describeEmbead = new Discord.MessageEmbed()
				var show;
				var i;
				if (args[1] === undefined) {
					show = 1;
					i = 0;
				} else {
					show = args[1];
					i = show-1;
					i *= 10;
				}
				console.log(termsOut.length)
				describeEmbead.title = `words in category \"${args[0]}\" on page ${show} of ${Math.ceil(termsOut.length/10)}`
				if (i < termsOut.length && i > -1) {
					describeEmbead.fields = []
					var k = i + 10;
					while (i < k && i < termsOut.length) {
						describeEmbead.fields.push({ name: termsOut[i].name + ` | ${termsOut[i].index}`, value: termsOut[i].shortDef, inline: false })
						i++;
					}

					message.channel.send(describeEmbead);
				}else{
					message.channel.send(`sorry, but the page ${args[1]} doesnt exist for that category`);
				}
			}
		}
	},
};