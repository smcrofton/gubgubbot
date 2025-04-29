const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/Messages.js')(sequelize, Sequelize.DataTypes);
require('./models/MessageScores.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize
    .sync({ force })
    .catch(console.error);