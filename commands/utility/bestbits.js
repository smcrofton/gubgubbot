const Op = require('sequelize');
const {Users, MessageScores, Messages, sequelize} = require('../../dbObjects.js');

const { SlashCommandBuilder, EmbedBuilder, channelLink } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bestbits')
		.setDescription('Grabs the best bits off the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		try{
			//yeah inject into my meme database dude i dare you
			const scores = await sequelize.query(`SELECT Users.username, SUM(MessageScores.score) as total_score,  Messages.content
					FROM MessageScores 
					JOIN Users ON MessageScores.author_id = Users.user_id
                    JOIN Messages ON MessageScores.msg_id = Messages.msg_id
					GROUP BY Messages.msg_id
					ORDER BY total_score DESC 
					LIMIT 5`, typeof Op.QueryTypes.SELECT);
			console.log(scores);

			const scoreboardEmbed = new EmbedBuilder()
				.setTitle('Best Bits')
				.setDescription("don't get a big head")
				.addFields(
					scores[0].map((msg, ) => ({
						name: `${msg.total_score}` + " - by " + `${msg.username}`,
						value : `${msg.content}`
					}))
				)
				.setTimestamp();
			
			await interaction.reply({ embeds: [scoreboardEmbed] });
		}
		catch (err) {
			console.error('Error fetching user:', err);
		}
        },
    };