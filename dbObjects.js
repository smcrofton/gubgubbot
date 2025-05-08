const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Messages = require('./models/Messages.js')(sequelize, Sequelize.DataTypes);
const MessageScores = require('./models/MessageScores.js')(sequelize, Sequelize.DataTypes);

Users.hasMany(Messages, {
	foreignKey: 'author_id',
});
Users.hasMany(MessageScores, {
	foreignKey: 'user_id',
});

Messages.belongsTo(Users, {
	foreignKey: 'author_id',
});
Messages.hasMany(MessageScores);

MessageScores.belongsTo(Messages);

MessageScores.belongsTo(Users, {
	foreignKey: 'user_id',
});

module.exports = { Users, Messages, MessageScores, sequelize};
