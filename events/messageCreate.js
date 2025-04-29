const { Users, Messages, MessageScores } = require('../dbObjects.js');

const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        console.log("message")
        if (message.author.bot) return;

        if (!message.reference) return;

        // Check if the message contains "+2"
        if (message.content.includes('+2')) {
            console.log(`Found "+2" in message: ${message.content}`);

            try{
                const repliedToMessage = await message.channel.messages.fetch(message.reference.messageId);

                //check if the message is already in the database
                msgCheck = await Messages.findOne({
                    where: { msg_id: repliedToMessage.id}
                });

                if (!msgCheck) {

                    //check if the author of the message is already in the database
                    authorCheck = await Users.findOne({
                        where: { user_id: repliedToMessage.author.id}
                    });

                    if (!authorCheck) {
                        await Users.upsert({
                            user_id: repliedToMessage.author.id,
                            username: repliedToMessage.author.username,
                        });
                    }

                    await Messages.upsert({
                        msg_id: repliedToMessage.id,
                        author_id: repliedToMessage.author.id,
                        content: repliedToMessage.content,
                    });
                }

                //check if the user giving the score is already in the database
                userCheck = await Users.findOne({
                    where: { user_id: message.author.id}
                });

                if (!userCheck) {
                    await Users.upsert({
                        user_id: message.author.id,
                        username: message.author.username,
                    });
                }

                await MessageScores.upsert({
                    msg_id: repliedToMessage.id,
                    author_id: repliedToMessage.author.id,
                    user_id: message.author.id,
                    score: 2,
                });

            } catch (err) {
                console.error('Error fetching replied-to message:', error)
            }
            
        }

        // if (message.content.includes('-2')) {
        //     console.log(`Found "-2" in message: ${message.content}`);

        //     try{
        //         const repliedToMessage = await message.channel.messages.fetch(message.reference.messageId);
                
        //         repliedToMessage.reply("yeah dickrider");

        //     } catch (err) {
        //         console.error('Error fetching replied-to message:', error)
        //     }
            
        // }
	},
};
