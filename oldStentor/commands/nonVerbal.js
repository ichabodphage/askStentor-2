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
    name: 'nv',
    description: 'Ping!',
    async execute(message, args) {
        const describeEmbead = new Discord.MessageEmbed()
        describeEmbead.title = "notice"
        describeEmbead.setDescription('The user who used the command ask;nv wants to inform you that they are nonverbal. Which means they really don\'t enjoy or are incapable of speaking using text or words.\nInstead, they may want to use things such as emotes, pictures, concepts, or actions to communicate instead. Do not mind their actions or treat them differently, please speak to them as if you were speaking to someone who was fully verbal (unless they specify otherwise).')
        message.channel.send(describeEmbead);
    },
};