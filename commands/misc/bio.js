const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require(`../../models/bio`);

module.exports = {
	name: 'bio',
    timeout: 3000,
	description: 'Shows your bio',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const p = await client.prefix(message)

		let member = message.mentions.members.first();
		if (!member) {
			member = message.member;
		}
		let data = await Schema.findOne({ User: member.id });
		if (!data) {
			return message.reply(
				new MessageEmbed()
				.setColor('RED')
				.setDescription(`${member.toString()} doesn't have a bio`)
				.setFooter(`looks like there is no bio, you can set it by typing ${p}setbio`)
			);
		}
		message.reply(
			new MessageEmbed()
				.setTitle(`${member.user.tag}'s Bio`)
				.setDescription(data.Bio)
				.setColor('RANDOM')
				.setThumbnail(member.user.displayAvatarURL())
				.setFooter(`To update your bio do ${p}setbio`)
		);
	}
};
