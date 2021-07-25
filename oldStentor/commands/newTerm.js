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
const termFormater = require('./punctuationAlgs.js')

module.exports = {
  name: 'new-term',
  description: 'Ping!',
  async execute(message, args) {
    const allowed = await contributors.findAll()
    const userIDs = allowed.map(item => `${item.memberID}`)
    const currentUser = message.author.id
    if (userIDs.includes(currentUser)) {
      var questionList = ['name of the item(if it has spaces use dashes instead)', 'known coiner(enter unknown if unknown)', 'short definition.', 'long definition', 'category'];
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
      if (responseList.length == 5) {
        global.maxID++
        const termNew = await terms.create({ name: responseList[0], searchName: responseList[0].toLowerCase(), coiner: responseList[1], shortDef: responseList[2], longDef: termFormater.fixLongDef(responseList[3]), category: responseList[4], index: global.maxID })
        message.channel.send('sucessfully entered new term into database!')
        global.termCount++;
        global.client.user.setActivity("ask;help with "+ global.termCount + " terms | in " + client.guilds.cache.size +" servers", { type: "PLAYING" })
        global.wordList = await terms.findAll()
      } else {
        message.channel.send('error, you either did not enter any inputs or waited to long on cetain question, no term was added to the database')
      }
    } else {
      message.channel.send('sorry, this feature is still being implemented')
    }
  },
};