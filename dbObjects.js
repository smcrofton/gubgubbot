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

// Reflect.defineProperty(Users.prototype, 'addUser', {
// 	value: async user => {
// 		const existingUser = await Users.findOne({
// 			where: { user_id: user.user_id}
// 		});

// 		if (!existingUser) {
// 			return Users.create({user_id: user.user_id, username: user.username});
// 		}
// 	},
// });

// Reflect.defineProperty(Messages.prototype, 'addMsg', {
// 	value: async msg => {
// 		const existingMsg = await Messages.findOne({
// 			where: { msg_id: msg.msg_id}
// 		});

// 		if (!msg) {
// 			return Messages.create({msg_id: msg.msg_id, author_id: msg.author_id, content: msg.content});
// 		}
// 	},
// });

// Reflect.defineProperty(MessageScores.prototype, 'addMsgScore', {
// 	value: async msgScore => {
// 		const msgScore = await MessageScores.findOne({
// 			where: { msg_id: this.msg_id, user_id: this.user_id}
// 		});

// 		if (!msgScore) {
// 			return Messages.create({msg_id: this.msg_id, user_id: this.user_id, msgScore: this.msgScore});
// 		}
// 	},
// });

module.exports = { Users, Messages, MessageScores};
