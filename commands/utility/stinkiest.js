const Op = require('sequelize');
const {Users, MessageScores, Messages, sequelize} = require('../../dbObjects.js');

const { SlashCommandBuilder, EmbedBuilder, channelLink } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stinkiest')
		.setDescription("Grabs the most -2'd users."),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		try{
			//yeah inject into my meme database dude i dare you
			const scores = await sequelize.query(`SELECT Users.username, SUM(MessageScores.score) as total_score  
					FROM MessageScores 
					JOIN Users ON MessageScores.author_id = Users.user_id 
					GROUP BY MessageScores.author_id 
					ORDER BY total_score ASC 
					LIMIT 5`, typeof Op.QueryTypes.SELECT);
			console.log(scores);

			const scoreboardEmbed = new EmbedBuilder()
				.setTitle('Worst Spitters')
				.setDescription("hit the books guys")
				.addFields(
					scores[0].map((user, ) => ({
						name: `${user.total_score}`,
						value : `${user.username}`
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