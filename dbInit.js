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


const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize
    .sync({ force })
	.then(async () => {

		//temp test data
		const testData = [
			Users.upsert({
				user_id: '1',
				username: 'TestUser'
			}),
			Users.upsert({
				user_id: '2',
				username: 'Sclib'
			}),	
			Users.upsert({
				user_id: '3',
				username: 'Pruggles'
			}),
			Users.upsert({
				user_id: '4',
				username: 'Grugcel'
			}),
			Users.upsert({
				user_id: '216994126745436170',
				username: 'maymayman'
			}),
			Messages.upsert({
				msg_id: '1',
				author_id: '1',
				content: 'Test message'
			}),
			Messages.upsert({
				msg_id: '2',
				author_id: '2',
				content: 'Test message 2'
			}),
			Messages.upsert({
				msg_id: '3',
				author_id: '3',
				content: 'Test message 3'
			}),
			Messages.upsert({
				msg_id: '4',
				author_id: '4',
				content: 'Test message 4'
			}),
			Messages.upsert({
				msg_id: '5',
				author_id: '216994126745436170',
				content: 'Test message 5'
			}),
			Messages.upsert({
				msg_id: '6',
				author_id: '1',
				content: 'Test message 6'
			}),
			Messages.upsert({
				msg_id: '10',
				author_id: '216994126745436170',
				content: 'Test message 10'
			}),
			MessageScores.upsert({
				msg_id: '5',
				author_id: '216994126745436170',
				user_id: '2',
				score: 10
			}),
			MessageScores.upsert({
				msg_id: '2',
				author_id: '2',
				user_id: '3',
				score: 4
			}),
			MessageScores.upsert({
				msg_id: '3',
				author_id: '3',
				user_id: '4',
				score: -4
			}),
			MessageScores.upsert({
				msg_id: '4',
				author_id: '4',
				user_id: '1',
				score: -10
			}),
			MessageScores.upsert({
				msg_id: '1',
				author_id: '1',
				user_id: '216994126745436170',
				score: 2
			}),
			MessageScores.upsert({
				msg_id: '6',
				author_id: '1',
				user_id: '216994126745436170',
				score: 2
			}),
			MessageScores.upsert({
				msg_id: '10',
				author_id: '216994126745436170',
				user_id: '1',
				score: 2
			}),
		];

		await Promise.all(testData);
		console.log('Database synced and test data added!');

		sequelize.close();

	}).catch(console.error);