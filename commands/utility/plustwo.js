const {Users, MessageScores, Messages} = require('../../dbObjects.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('myscore')
		.setDescription('Checks your total +2s received'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		try{
			const scores = await MessageScores.findAll({
				where: { author_id: interaction.user.id },
			});

			var totalScore = 0;
			
			scores.forEach(element => {
				totalScore += element.score;
			});

			await interaction.reply("Your total +2s received: " + totalScore);	
		}
		catch (err) {
			console.error('Error fetching user:', err);
		}
        },
    };