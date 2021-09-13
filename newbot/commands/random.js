const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('randomly displays a term'),

    async execute(interaction) {
        // process termInput to output a term that is closest in similarity
        var termToBrowse = await db.Term.findAll()
        var randomTerm = termToBrowse[Math.floor(Math.random()*termToBrowse.length)]

        //simple discord embed output
        const embed = new MessageEmbed()
        embed.setColor('#93E9BE')
        embed.setTitle(randomTerm.name)
        embed.setDescription(`here is a random term`)
        var termUrl = urlTools.urlBuilder([randomTerm])
        embed.setURL(`https://askstentor.com/ask/term/:${termUrl[0]}`)
        embed.addField("coiner", randomTerm.coiner)
        embed.addField("definition", randomTerm.longdef)
        var k = await randomTerm.getCatagory()
        embed.addField("catagory", k.name)
        await interaction.reply({ embeds: [embed] })

    },
};