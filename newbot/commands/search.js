const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('displays a list of terms that are most similar to the input')
        .addStringOption(option => option.setName('termtosearch').setDescription('term to search').setRequired(true)),
    async execute(interaction) {
        var termInput = await interaction.options.getString('termtosearch');
        if (termInput !== undefined) {
            // process termInput to output a term that is closest in similarity
            var termToBrowse = await db.Term.findAll()
            var termFind = urlTools.sortSimilarities(termInput, termToBrowse, "name", ["name","shortdef"])
            termFind.length = 10
            //simple discord embed output
            var urls = urlTools.urlBuilder(termFind)
            const embed = new MessageEmbed()
            embed.setColor('#93E9BE')
            embed.setTitle(`search results for "${termInput}"`)
            embed.setDescription(`to fetch the full deffinition of the word, use the /def command or click on the link under the term`)
            var termUrl = urlTools.urlBuilder(termFind)
            for(var i = 0; i < termFind.length;i++){
                var precent = termFind[i].closeness*100
                embed.addField(`${termFind[i].name} (${precent.toFixed(2)}%)`, `[${termFind[i].shortdef}](https://askstentor.com/ask/term/:${urls[i]})`)
            }
            
            await interaction.reply({ embeds: [embed] })
        }
    },
};