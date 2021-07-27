
const Sequelize = require('sequelize');
const UserModel = require('./models/user.js');
const TermModel = require('./models/term.js');
const CatagoryModel = require('./models/catagory.js');

const sequelize = new Sequelize('mydb','stentor','7Zk6u3-]qA{]2~?Q',{
  dialect: 'postgres',
  port: 5432,
  replication: {
    read: [
      { host: '192.53.161.46' },
      { host: '192.53.161.46' }
      // witness node has no data, only metadata
    ],
    write: { host: '192.53.161.46' }
  },
  pool: {
    max: 10,
    idle: 30000
  },

});

async function connect() {
  console.log('Checking database connection...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}
connect();
const User = UserModel(sequelize, Sequelize);
const Term = TermModel(sequelize, Sequelize);
const Catagory = CatagoryModel(sequelize, Sequelize);

Term.belongsTo(catagory);

Catagory.hasMany(term);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Term,
  Catagory
}