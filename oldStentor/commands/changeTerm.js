const Discord = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'newDb.sqlite',
});
const prompter = require('discordjs-prompter');
const terms = require('./models/words')(sequelize, Sequelize.DataTypes);
const contributors = require('./models/contributorsnew')(sequelize, Sequelize.DataTypes);
module.exports = {
    name: 'change-term',
    description: 'Ping!',
    async execute(message, args) {
        if (args.length !== 0) {
            const allowed = await contributors.findAll()
            const userIDs = allowed.map(item => `${item.memberID}`)
            const currentUser = message.author.id
            var termToChange;
            termToChange = await terms.findOne({ where: { name: args[0] } });
            if (termToChange === null) {
                termToChange = await terms.findOne({ where: { index: parseInt(args[0]) } });
            }
            if (termToChange !== null) {


                if (userIDs.includes(currentUser)) {
                    var questionList = [`what atribute of term \"${termToChange.name}\" do you wish to change, your options are \nname , coiner, shortDef, longDef, and category`
                        , `what would you like to change that atribute too?`];
                    var responseList = await questionList.reduce(
                        async (previousQuestions, currentQuestion, index) => {
                            // responses will contain an array of the previous responses
                            const responses = await previousQuestions;

                            // Here you could use the index variable to check in which question you
                            // are at and use the responses array to change the question accordingly.
                            let question = currentQuestion;

                            const messageCollection = await prompter.message(message.channel, {
                                question,
                                userId: message.author.id,
                                timeout: 180000,
                                max: 1,
                            });

                            // Get the first message from the returned collection
                            const msg = messageCollection.first();
                            // If the user timed out the collection will be empty
                            const response = msg ? msg.content : null;

                            return [...responses, response];
                        },
                        [],

                    );
                    if (termToChange[responseList[0]] !== undefined) {
                        termToChange[responseList[0]] = responseList[1]

                        await termToChange.save()
                        console.log(termToChange[responseList[0]])
                        message.channel.send(`successfully changed atribute \"${responseList[0]}\" of \"${args[0]}\" in the database`)
                        global.wordList = await terms.findAll()

                    } else {
                        message.channel.send(`sorry, but \"${responseList[0]}\" is not an atribute of any word in the database, nothing was changed`)
                    }
                }
            } else {
                message.channel.send(`sorry, but \"${args[0]}\" cant be found in the database`)
            }
        } else {
            message.channel.send('sorry, this feature is still being implemented')
        }

    },
};