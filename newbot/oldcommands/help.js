const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = {
    name: "help",
    async execute(message, args) {
        const describeEmbead = new MessageEmbed()
        describeEmbead.setColor("#93E9BE")
        switch (args[0]) {
            case "def":
                describeEmbead.title = "definition command"
                describeEmbead.setDescription('command that gets the definition of a word based upon its id or the name of the word')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;def headmate\n/def headmate`, inline: false }
                ]
                break;
            case "random":
                describeEmbead.title = "random command"
                describeEmbead.setDescription('command that gets the definition of a random word in the database')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;random \n /random`, inline: false }
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
                    { name: `usage`, value: `ask;getall\n /getall`, inline: false }
                ]
                break;
            case "search":
                describeEmbead.title = "search"
                describeEmbead.setDescription('command shows the 5 most similar words in the database to the word being searched')
                describeEmbead.fields = [
                    { name: `usage`, value: `ask;search system\n /search system`, inline: false }
                ]
                break;
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
                describeEmbead.setDescription('this is the help menu, use this menu to navigate the commands within askstentor')
                describeEmbead.fields = [
                    { name: `def`, value: `retreives the definition of a term`, inline: false },
                    { name: `getall`, value: `displays all the catagories within the aplication`, inline: false },
                    { name: `search`, value: `displays a list of the most simular terms to the parameter`, inline: false },
                    { name: `nv`, value: `explains what being nonverbal is`, inline: false },
                    { name: `invite`, value: `sends bot invite link`, inline: false },
                    { name: `random`, value: `provides a random term`, inline: false },
                    { name: `valid`, value: `reminds you that you are valid`, inline: false }

                ]
                break;
        }
       message.channel.send({embeds: [describeEmbead]});
    },

};