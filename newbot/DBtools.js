
const Sequelize = require('sequelize');
const UserModel = require('./models/user.js');
const TermModel = require('./models/term.js');
const CatagoryModel = require('./models/catagory.js');
const user = require('./models/user.js');
const term = require('./models/term.js');

const hasher = require("./helpfulMethods/securityTools")

const Oldsequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'newDb.sqlite',
});
const oldterms = require('./models/words')(Oldsequelize, Sequelize.DataTypes);
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

Term.belongsTo(Catagory);

Catagory.hasMany(Term);
 /*
async function dbMake(){
  
  var oldTerms = await oldterms.findAll();
  var catList = await Catagory.findAll()
  console.log()
  var catList = []
  for(var i = 0 ; i < oldTerms.length;i++){
    var X = await Term.findOne({where:{name: oldTerms[i].name}})
    var B = await Catagory.findOne({where:{name: oldTerms[i].category}})
    console.log(X.name)
    console.log(B.name)
    await B.addTerm(X)
    
    var k = await Term.create({
      name: oldTerms[i].name,
      shortdef: oldTerms[i].shortDef,
      longdef: oldTerms[i].longDef,
      coiner: oldTerms[i].coiner
    })
    if(!catList.includes(oldTerms[i].category)){
      B = await Catagory.create({name: oldTerms[i].category})
      catList.push(oldTerms[i].category)
    }
    
  }
}
dbMake()*/

module.exports = {
  sequelize,
  Sequelize,
  User,
  Term,
  Catagory
}