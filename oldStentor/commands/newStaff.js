const Discord = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'newDb.sqlite',
});
const prompter = require('discordjs-prompter');
const terms = require('./models/terms')(sequelize, Sequelize.DataTypes);
const contributors = require('./models/contributorsnew')(sequelize, Sequelize.DataTypes);
module.exports = {
    name: 'hire',
    description: 'Ping!',
    async execute(message, args) {
        const allowed = await contributors.findOne({ where: { memberID : '300479769181552642' } });
        
        const currentUser = message.author.id
        if(allowed.memberID === currentUser){
            const newContributor = await contributors.create({name: args[0],memberID: args[1], role:args[2]})
        }else{
            message.channel.send('sorry, only the stentor system can use this comand')
        }
     
    },
};