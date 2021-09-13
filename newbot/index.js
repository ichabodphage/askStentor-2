var cp = require('child_process');
var n = cp.fork(__dirname + '/makeCommands');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token , prefix } = require('./config.json');
const db = require("./DBtools")

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var oldCommands = new Map()
const oldcommandFiles = fs.readdirSync('./oldcommands').filter(file => file.endsWith('.js'));
for (const file of oldcommandFiles) {
	const command = require(`./oldcommands/${file}`);
	oldCommands.set(command.name, command);
	console.log(client.oldCommands)
}
client.once('ready', async function () {
	console.log('Ready!');
	var termList = await db.Term.findAndCountAll();
	client.user.setActivity(`ask;help in ${client.guilds.cache.size} servers | ${termList.count} terms`, { type: "PLAYING" })

});
var interval = setInterval(async function () {
	var termList = await db.Term.findAndCountAll();
	client.user.setActivity(`ask;help in ${client.guilds.cache.size} servers | ${termList.count} terms`, { type: "PLAYING" })
}, 60000);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	console.log(command)
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if(oldCommands.get(command) !== undefined){
		oldCommands.get(command).execute(message,args)
	}
	
});
client.login(token);