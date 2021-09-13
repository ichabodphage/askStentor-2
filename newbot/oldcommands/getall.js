const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../DBtools")
const { MessageEmbed } = require('discord.js');
const urlTools = require("../helpfulMethods/urlTools")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = {
    /* 
        allows the browsing of catagories, can be used with or without an argument for the catagory to browse
        
        with an argument: returns a catagory to browse closest to the string the user used as an input for the string option
        without an argument: returns a list of all the catagories along with the amount of terms within them
    */
    name: "getall",
    async execute(message,args) {
        var catInput = args[0]
        if (catInput === null || catInput === undefined) {

            //create the mesage imbed
            const embed = new MessageEmbed()
            embed.setColor('#93E9BE')
            embed.setTitle("here are the catagories")
            embed.setDescription(`to view the terms in each catagory, use the /getall command with the name of the catagory as a parameter, or click on the links to browse the catagory on the website`)
            //build the lists needed for the output
            var catList = await db.Catagory.findAll()
            var URLS = urlTools.urlBuilder(catList)

            //loop over all the catagories and push the name of each catagory and the amount of terms within it into a feild
            for (var i = 0; i < catList.length; i++) {
                var terms = await catList[i].getTerms()
                embed.addField(catList[i].name, `[terms:${terms.length}](https://askstentor.com/ask/catagory/:${URLS[i]})`)

            }
            await message.reply({ embeds: [embed] })
        } else {
            //find the catagory that best matches the user input
            var catagoryToBrowse = await db.Catagory.findAll()
            var CatagoryFind = urlTools.sortSimilarities(catInput.toString(), catagoryToBrowse, "name", ["name"])
            var catToShow = await db.Catagory.findOne({ where: { name: CatagoryFind[0].name } })

            // get the array of terms for the catagory and arange them in a format that can be easily read (jagged aray with max amount of elements in each row being 10)
            var termList = await catToShow.getTerms()
            var URLS = urlTools.urlBuilder(termList)
            URLS = urlTools.splitArr(URLS, 10)
            termList = urlTools.splitArr(termList, 10)

            // set up buttons for browsing the term menu
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('back')
                        .setLabel('back')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('next')
                        .setLabel('next')
                        .setStyle('PRIMARY')
                );
            const filter = v => v.user.id === message.author.id
            const collector = message.channel.createMessageComponentCollector({ filter, time: 32000 });

            // set up the embed as output
            var beginIndex = 0;
            const embed = new MessageEmbed()
            embed.setColor('#93E9BE')
            embed.setTitle("terms in catagory " + catToShow.name)
            var catUrl = urlTools.urlBuilder([catToShow])
            embed.setURL(`https://askstentor.com/ask/catagory/:${catUrl[0]}`)
            embed.setDescription(`page: ${beginIndex+1}/${termList.length}`)

            // add fields to the discord embead containing the terms
            for (var i = 0; i < termList[beginIndex].length; i++) {
                embed.addField(termList[beginIndex][i].name, `[${termList[beginIndex][i].shortdef}](https://askstentor.com/ask/term/:${URLS[beginIndex][i]})`)
            }

            //process the pressing of the buttons to navigate the menus
            await message.channel.send({ components: [row], embeds: [embed] })
            collector.on('collect', async v => {
                    // input processing for back button
                if (v.customId === 'back') {
                    if (beginIndex > 0) {
                        embed.fields = [];
                        beginIndex--;
                        embed.setDescription(`page: ${beginIndex+1}/${termList.length}`)
                        if (termList[beginIndex].length !== undefined) {
                            for (var i = 0; i < termList[beginIndex].length; i++) {
                                embed.addField(termList[beginIndex][i].name, `[${termList[beginIndex][i].shortdef}](https://askstentor.com/ask/term/:${URLS[beginIndex][i]})`)
                            }
                        }
                    }

                    await v.update({components: [row], embeds: [embed] });
                    // input processing for next page button
                } else if (v.customId === 'next') {
                    if (beginIndex < termList.length-1) {
                        embed.fields = [];
                        beginIndex++;
                        embed.setDescription(`page: ${beginIndex+1}/${termList.length}`)
                        if (termList[beginIndex].length !== undefined) {
                            for (var i = 0; i < termList[beginIndex].length; i++) {
                                embed.addField(termList[beginIndex][i].name, `[${termList[beginIndex][i].shortdef}](https://askstentor.com/ask/term/:${URLS[beginIndex][i]})`)
                            }
                        }
                    }
                    await v.update({ components: [row], embeds: [embed] });
                }
            });
            collector.on('end',async function(collected){
                message.channel.send("menu timed out")
            });
        }
    },
};