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
    name: 'delete-term',
    description: 'Ping!',
    async execute(message, args) {
        if (args.length !== 0) {
            const allowed = await contributors.findAll()
            const userIDs = allowed.map(item => `${item.memberID}`)
            const currentUser = message.author.id
            const termToDelete = await terms.findOne({ where: { name: args[0] } });
            if (userIDs.includes(currentUser)) {
                if (termToDelete !== null) {
                    const questionList = ['are you sure you want to delete this term? say yes to continue'];
                    const responseList = await questionList.reduce(
                        async (previousQuestions, currentQuestion, index) => {
                            // responses will contain an array of the previous responses
                            const responses = await previousQuestions;

                            // Here you could use the index variable to check in which question you
                            // are at and use the responses array to change the question accordingly.
                            let question = currentQuestion;

                            const messageCollection = await prompter.message(message.channel, {
                                question,
                                userId: message.author.id,
                                timeout: 30000,
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
                    if (responseList[0] === "yes") {
                        if(termToDelete.index == global.maxID){
                            global.maxID = global.maxID-1;
                        }
                        console.log(global.maxID)
                        await termToDelete.destroy()
                        message.channel.send(`sucessfully removed term \"${args[0]}\" from the database`)
                        
                        global.termCount--;
                        global.client.user.setActivity("ask;help with "+global.termCount + " terms | in " + client.guilds.cache.size +" servers", { type: "PLAYING" })
                        global.wordList = await terms.findAll()
                    } else {
                        message.channel.send(`you either waited to long or said no, as such, the term was not deleted`)
                    }
                } else {
                    message.channel.send(`couldnt find term \"${args[0]}\" in the database`)
                }
            } else {
                message.channel.send('sorry, only term hunters and developers for the askStentor bot can use that command')
            }
        } else {
            message.channel.send(`sorry, this feature is still being implemented`)
        }
    },
};