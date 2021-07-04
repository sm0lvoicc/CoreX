const fs = require('fs');
const glob = require('glob');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'reload',
    description: "Reloads the command",
    timeout: 1000,
    hidden: true,
    run: async (client, message, args) => {
        
        let array = ['538668078012039168', '451202806653648936']
  
        if(!array.includes(message.author.id.toString())) {
          return;
        }

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
			.setDescription(`<:corexyes:860561725916053514>	Reloaded all the commands`)
			)
		})

    }
}