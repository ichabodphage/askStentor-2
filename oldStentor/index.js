const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { prefix, token } = require('./config.json');
const prompter = require('discordjs-prompter');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'newDb.sqlite',
});
global.client = new Discord.Client();
const terms = require('./models/words')(sequelize, Sequelize.DataTypes);
global.client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));




//this computes the global term count on startup along with setting the status
global.client.once('ready', async function () {
	console.log('Ready!');
	client.user.setAvatar("askStentor.png")
	var items = await terms.findAll()
	var mep = items.map(function (a) { a.name })
	var indexArray = items.map(item => item.index)
	// global variables meant to be used in other commands
	global.maxID = Math.max(...indexArray)
	console.log(global.maxID)
	global.wordList = items
	global.termCount = mep.length
	client.user.setActivity("ask;help with "+ global.termCount + " terms | in " + client.guilds.cache.size +" servers", { type: "PLAYING" })
});


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//resets the status of the bot every minute
var interval = setInterval(async function () {
	client.user.setActivity("ask;help with "+global.termCount + " terms | in " + client.guilds.cache.size +" servers", { type: "PLAYING" })
}, 60000);

//method that processes commands
global.client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!global.client.commands.has(command)) return;

	try {
		global.client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(token);