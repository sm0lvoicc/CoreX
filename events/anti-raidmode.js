const client = require('../index')
const schema = require('../models/raidmode');
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

client.on('guildMemberAdd', async(member) => {
    schema.findOne({ Guild: member.guild.id }, async (err, data) => {
		const kickReason = 'Anti-raidmode activated';
		if (!data) return;
		if (data) {
            try {
                member.send(
                    new MessageEmbed()
                        .setTitle(`Server Under Lockdown`)
                        .setDescription(
                            `You have been kicked from **${
                                member.guild.name
                            }** with reason: **${kickReason}**`
                        )
                        .setColor('RED')
                );
            } catch(e){
                throw e
            }
			member.kick(kickReason);
		}
	});
})