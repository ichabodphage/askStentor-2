const Discord = require('discord.js');
const Sequelize = require('sequelize');
const stringSimilarity = require('string-similarity');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'newDb.sqlite',
});
const contributors = require('./models/contributorsnew')(sequelize, Sequelize.DataTypes);
module.exports = {
    name: 'credits',
    description: 'Ping!',
    async execute(message, args) {
        const describeEmbead = new Discord.MessageEmbed()
		describeEmbead.title = "contributors to the project"
		
		
			describeEmbead.fields.push({ name: "this bot is the public version of the bot", value: "there are no specific contributors" ,inline: false })
		
		message.channel.send(describeEmbead);
    },
};