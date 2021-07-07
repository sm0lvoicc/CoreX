const { Client, Message, MessageEmbed } = require('discord.js');
const Nuggies = require('nuggies');
const emoji = require(`../../emoji.json`)
module.exports = {
    name: 'dp-create',
    description: 'creates dropdown roles',
    timeout: 6000,
    usage: 'answer the messages',
    aliases: ['dropdown-roles'],    
	userPerms: ['MANAGE_GUILD'],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
		try {

			const dpmanager = new Nuggies.dropdownroles();
		message.channel.send('Send messages in `roleID label emoji` syntax! Once finished say `done`.');
	
		/**
		 * @param {Discord.Message} m
		 */
		const filter = m => m.author.id === message.author.id;
		const collector = message.channel.createMessageCollector(filter, { max: 10000 });
	
		collector.on('collect', async (msg) => {
			if (!msg.content) return message.channel.send('Invalid syntax');
			if (msg.content.toLowerCase() == 'done') return collector.stop('DONE');
			if (!msg.content.split(' ')[0].match(/[0-9]{18}/g)) return message.channel.send('Invalid syntax');
	
			const roleid = msg.content.split(' ')[0];
			const role = message.guild.roles.cache.get(roleid);
			if (!role) return message.channel.send('Invalid role');
	
			const label = msg.content.split(' ').slice(1, msg.content.split(' ').length - 1).join(' ');
	
			const reaction = (await msg.react(msg.content.split(' ').slice(msg.content.split(' ').length - 1).join(' ')).catch(/*() => null*/console.log));
	
			const final = {
				role: roleid, label: label, emoji: reaction ? reaction.emoji.id || reaction.emoji.name : null,
			};
			dpmanager.addrole(final);
		})
	
		collector.on('end', async (msgs, reason) => {
			if (reason == 'DONE') {
				const embed = new MessageEmbed()
					.setTitle('Dropdown roles!')
					.setDescription('Click on the buttons to get the specific role or vice-versa')
					.setColor('RANDOM')
					.setTimestamp();
				Nuggies.dropdownroles.create({ message: message, content: embed, role: dpmanager, channelID: message.channel.id })
			}
		});
		} catch(e) {
			message.channel.send(`There has been an error, **${e}**`)
		}
    }
}