const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('def')
        .setDescription('gets the deffinition of a term')
        .addStringOption(option => option.setName('termtosearch').setDescription('term to search').setRequired(true)),
    async execute(interaction) {
        var termInput = await interaction.options.getString('termtosearch');
        if (termInput !== undefined) {
            // process termInput to output a term that is closest in similarity
            var termToBrowse = await db.Term.findAll()
            var termFind = urlTools.sortSimilarities(termInput, termToBrowse, "name", ["name"])
            var termToShow = await db.Term.findOne({ where: { name: termFind[0].name } })
            var termCat = await termToShow.getCatagory()

            //simple discord embed output
            const embed = new MessageEmbed()
            embed.setColor('#93E9BE')
            embed.setTitle(termToShow.name)
            var precent = termFind[0].closeness*100
            embed.setDescription(`closest match to: "${termInput}" (${precent.toFixed(2)}%) `)
            var termUrl = urlTools.urlBuilder([termToShow])
            embed.setURL(`https://askstentor.com/ask/term/:${termUrl[0]}`)
            embed.addField("coiner", termToShow.coiner)
            embed.addField("definition", termToShow.longdef)
            embed.addField("catagory", termCat.name)
            await interaction.reply({ embeds: [embed] })
        }
    },
};