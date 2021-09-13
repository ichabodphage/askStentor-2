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
        embed.setTitle(`invite links for askStentor`)
        embed.addField(`invite`,`[top.gg page](https://top.gg/bot/794926252594823169)`)
        embed.addField(`support server`,`[support server link](https://discord.gg/ntPrY2wkMP)`)
        embed.addField(`website`,`[website link](https://askstentor.com/)`)
        await message.channel.send({ embeds: [embed] })

    },
};