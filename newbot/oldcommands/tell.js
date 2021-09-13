const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
module.exports = {
    name: "valid",
    async execute(interaction,args) {
        var mesageIndex = Math.floor(Math.random() * Math.floor(9))
        const describeEmbead = new MessageEmbed()
        describeEmbead.title = "notice"
        var messageList =[
        'endogenic systems are valid, thats all :)',
        'you are not faking, you are indeed real and valid :)',
        'just a nice reminder, we are all different, you are not invalid if you don\'t experience something the same way others do :)',
        'askStentor politely asks you to remember that all system origins are valid, there is no one cause for a specific phenomenon :)',
        'parogenic systems are valid, thats all :)',
        'no ammount of suffering is needed to be plural :)',
        'if you are afraid that you are faking, you probably are not :)',
        'reminder, you dont owe anyone your trauma if you have it :)',
        'those with typing quirks are perfectly valid, regardless of their reason for their speech patterns :)',
        //new
        'no matter how bad you were in the past, look how far you are now :)',
        'your here for a good reason! so go out there and do great things :)'
        ]

        describeEmbead.setDescription(messageList[mesageIndex])
        await interaction.channel.send({ embeds: [describeEmbead] })

    },
};