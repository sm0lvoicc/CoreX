const fs = require('fs');
const glob = require('glob');
const { MessageEmbed } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'reload',
    description: "Reloads the command",
    timeout: 1000,
    hidden: true,
    run: async (client, message, args) => {
        
		if (
			!require("../../config.json").owners.includes(
			  message.author.id
			)
		  )
			return;

		client.commands.sweep(() => true);
		glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
			if(err) throw err;
			filePaths.forEach((file) => {
				delete require.cache[require.resolve(file)]

				const pull = require(file)

				if(pull.name) {
					client.commands.set(pull.name, pull);
				}

				if(pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => {
					client.aliases.set(alias, pull.name)
					})
				}
			})
			message.channel.send(new MessageEmbed()
			.setColor('BLURPLE')
			.setDescription(`${emoji.success} Reloaded all the commands`)
			)
		})

    }
}