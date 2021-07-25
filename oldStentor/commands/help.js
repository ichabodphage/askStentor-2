const Discord = require('discord.js');
const Sequelize = require('sequelize');
const stringSimilarity = require('string-similarity');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'newDb.sqlite',
});
module.exports = {
    name: 'help',
    description: 'Ping!',
    async execute(message, args) {
        const describeEmbead = new Discord.MessageEmbed()
        switch (args[0]) {
            case "def":
                describeEmbead.title = "definition command"
                describeEmbead.setDescription('command that gets the definition of a word based upon its id or the name of the word')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;def 82\nask;def headmate`, inline: false }
                ]
                break;
            case "random":
                describeEmbead.title = "random command"
                describeEmbead.setDescription('command that gets the definition of a random word in the database')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;random`, inline: false }
                ]
                break;
            case "valid":
                describeEmbead.title = "valid command"
                describeEmbead.setDescription('command that reminds you that you are valid')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;valid`, inline: false }
                ]
                break;
            case "getall":
                describeEmbead.title = "getall command"
                describeEmbead.setDescription('command that shows every word category and the number of words in that category along with the amount of pages within that word category')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;getall`, inline: false }
                ]
                break;
            case "search":
                describeEmbead.title = "search"
                describeEmbead.setDescription('command shows the 5 most similar words in the database to the word being searched')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;search system`, inline: false }
                ]
                break;
            case "credits":
                describeEmbead.title = "credits"
                describeEmbead.setDescription('shows the list of people who have contributed to the project, either by helping find new terms or contributing to the bots codebase')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;credits`, inline: false }
                ]
                break;
            case "nv":
                describeEmbead.title = "nv"
                describeEmbead.setDescription('a command usefull to nonverbal people to explain to others what being nonverbal is')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;nv`, inline: false }
                ]
                break;
            case "invite":
                describeEmbead.title = "invite"
                describeEmbead.setDescription('command that links a webseite that allows you to invite askStentor to your server')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;invite`, inline: false }
                ]
                break;
            default:
                describeEmbead.title = "help menu"
                describeEmbead.setDescription('this is the help menu, to get more information of a command, enter ask;help and then the name of the command\n example ask;help def')
                describeEmbead.fields = [
                    { name: `def`, value: `gets the definition of a word`, inline: false },
                    { name: `getall`, value: `gets all the words in the database`, inline: false },
                    { name: `search`, value: `searches for a word in the database`, inline: false },
                    { name: `credits`, value: `shows contributors to the project`, inline: false },
                    { name: `nv`, value: `explains what being nonverbal is`, inline: false },
                    { name: `invite`, value: `sends bot invite link`, inline: false },
                    { name: `random`, value: `provides a random term`, inline: false },
                    { name: `valid`, value: `reminds you that you are valid`, inline: false },
                   
                ]
                break;
        }
        message.channel.send(describeEmbead);
    },
};