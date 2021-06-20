const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require(`../../models/bio`);

module.exports = {
	name: "setbio",
    timeout: 5000,
	description: 'Sets/Updates your bio.',
	usage: '<text>',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if(args < 1) return message.reply('Please add text to your bio')
		Schema.findOne({ User: message.author.id }, async (err, data) => {
			if (data) data.delete();
			new Schema({
				User: message.author.id,
				Bio: args.join(" ")
			}).save();
		})
		message.reply(
			`Successfully Updated Your Bio`
		)
	}
}