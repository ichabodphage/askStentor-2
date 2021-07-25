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
    name: 'help-staff',
    description: 'Ping!',
    async execute(message, args) {
        const allowed = await contributors.findAll()
        const userIDs = allowed.map(item => `${item.memberID}`)
        const currentUser = message.author.id
        if (userIDs.includes(currentUser)) {
            const describeEmbead = new Discord.MessageEmbed()
            switch (args[0]) {
                case "new-term":
                    describeEmbead.title = "new-term"
                    describeEmbead.setDescription('command that asks a series of 5 questions, each one relating to each atribute of the term in the database. each question must be awnsered within 3 minutes after the previous one')
                    describeEmbead.fields = [
                        { name: `usage`, value: `ask;new-term`, inline: false }
                    ]
                    break;
                case "delete-term":
                    describeEmbead.title = "delete-term"
                    describeEmbead.setDescription('command that takes a term as a parameter and asks the user if they really want to delete that term in the database')
                    describeEmbead.fields = [
                        { name: `usage`, value: `ask;delete-term delete-this`, inline: false }
                    ]
                    break;
                case "change-term":
                    describeEmbead.title = "change-term"
                    describeEmbead.setDescription('command that takes a term as a parameter and asks what atribute of that term should be changed along with what to change that atribute to')
                    describeEmbead.fields = [
                        { name: `usage`, value: `ask;change-term change-this`, inline: false }
                    ]
                    break;
                default:
                    describeEmbead.title = "help menu for staff"
                    describeEmbead.setDescription('this is the help menu for staff members, here you will find commands that will help you enter, modify, and delete terms from the database')
                    describeEmbead.fields = [
                        { name: `new-term`, value: `enters a new term in the database`, inline: false },
                        { name: `delete-term`, value: `deletes an existing term in the database`, inline: false },
                        { name: `change-term`, value: `changes an atribute of a word in the database`, inline: false }
                    ]
                    break;
            }
            message.channel.send(describeEmbead);
        } else {
            message.channel.send('sorry, only term hunters and developers for the askStentor bot can use that command')
        }
    },
};