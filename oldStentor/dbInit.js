const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const newsequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'newDb.sqlite',
});

const terms = require('./models/terms')(sequelize, Sequelize.DataTypes);
const words = require('./models/words')(newsequelize, Sequelize.DataTypes);
const contributors = require('./models/contributorsOld')(sequelize, Sequelize.DataTypes);
const newcontributors = require('./models/contributorsnews')(newsequelize, Sequelize.DataTypes);
const force = process.argv.includes('--force') || process.argv.includes('-f');

newsequelize.sync({ force }).then(async () => {
	
	const helpers = [
		newcontributors.upsert({ name: "Stentor System", memberID: '300479769181552642', role: 'project cordinator' })
		
	]
	
	await Promise.all(helpers);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);