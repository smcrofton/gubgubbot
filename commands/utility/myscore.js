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

			const scoreboardEmbed = new EmbedBuilder()
				.setTitle(interaction.user.username + " +2's")
				.setDescription("Current Score: " + currScores[0].dataValues.total_score)
				.addFields(
					{ name: 'Total +2s score', value: `${posScores[0].dataValues.total_score}`, inline: true },
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