const Discord = require('discord.js');
const Sequelize = require('sequelize');
const stringSimilarity = require('string-similarity');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'newDb.sqlite',
});
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}
const terms = require('./models/words')(sequelize, Sequelize.DataTypes);
module.exports = {
    name: 'search',
    description: 'Ping!',
    async execute(message, args) {
        if (args.length !== 0) {
  
            let nameOut = global.wordList.map(item => `${item.name}`)
            var nameAndSimilarityScore = []
            for (var i = 0; i < nameOut.length; i++) {
                var similarity = stringSimilarity.compareTwoStrings(args[0].toLowerCase(), nameOut[i].toLowerCase())
                nameAndSimilarityScore.push({ name: nameOut[i], similarity })
            }
            nameAndSimilarityScore.sort(compareValues('similarity'))
            const describeEmbead = new Discord.MessageEmbed()
            describeEmbead.title = `here are the 5 most similar words to \"${args[0]}\"`
            describeEmbead.setDescription('to learn more about a term, enter ask;def with the number next to the term as a parameter.\nexample ask;def 7')
            for (var i = nameAndSimilarityScore.length - 1; i > nameAndSimilarityScore.length - 6; i--) {

                var exactWord = global.wordList.find(element => element.name === nameAndSimilarityScore[i].name)
                describeEmbead.fields.push({ name: exactWord.name + ` | ${exactWord.index}`, value: exactWord.shortDef, inline: false })


            }
            message.channel.send(describeEmbead);
        }else{
            message.channel.send(`please provide a term to search within the database.`)
        }
    },
};