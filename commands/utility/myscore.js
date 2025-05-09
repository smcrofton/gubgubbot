const sequelize = require('sequelize');
const {Users, MessageScores, Messages} = require('../../dbObjects.js');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('myscore')
		.setDescription('Checks your total +2s received'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		try{
			//Grab the total score, positive scores, and negative scores for the user who ran the command
			const currScores = await MessageScores.findAll({
				attributes: ['author_id', [sequelize.fn("SUM", sequelize.col("score")), "total_score"]],
				where: { author_id: interaction.user.id },
				group: ['author_id']
			});

			const posScores = await MessageScores.findAll({
				attributes: ['author_id', [sequelize.fn("SUM", sequelize.col("score")), "total_score"]],
				where: { author_id: interaction.user.id, score: { [sequelize.Op.gt]: 0 } },
				group: ['author_id']
			});

			const negScores = await MessageScores.findAll({
				attributes: ['author_id', [sequelize.fn("SUM", sequelize.col("score")), "total_score"]],
				where: { author_id: interaction.user.id, score: { [sequelize.Op.lt]: 0 } },
				group: ['author_id']
			});

			//check if any of the queries came back undefined, and if so, gives error message
			const scoreboardEmbed = new EmbedBuilder()
				.setTitle(interaction.user.username + " +2's")
				.setDescription(currScores[0] == undefined ? "You haven't point farmed yet slime." : 
					"Current Score: " + `${currScores[0].dataValues.total_score}`)
				.addFields(
					posScores[0] == undefined ? { name: '\u200B', value: '\u200B' } :
						{ name: 'Total +2s score', value: `${posScores[0].dataValues.total_score}`, inline: true },
					negScores[0] == undefined ? { name: '\u200B', value: '\u200B' } :
						{ name: 'Total -2s score', value: `${negScores[0].dataValues.total_score}`, inline: true }
				)
				.setTimestamp();
			
			await interaction.reply({ embeds: [scoreboardEmbed] });
		}
		catch (err) {
			console.error('Error fetching user:', err);
		}
        },
    };