const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
module.exports = {
    name: "invite",
    async execute(message,args) {

        const embed = new MessageEmbed()
        embed.setColor('#93E9BE')
        embed.setTitle(`notice`)
        embed.setDescription("the user who used this command wants to inform you that they are nonverbal, and probably would like to communicate with things like emojis or pictures rather than with words")
        await message.channel.send({ embeds: [embed] })

    },
};