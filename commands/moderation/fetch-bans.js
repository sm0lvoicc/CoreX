const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'fetch-bans',
    aliases: ['bans', 'banned'],
    description: 'Shows banned members',
    timeout: 9000,
    usage: '',
    userPerms: ['BAN_MEMBERS'],
    clientPerms: [''],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const fetchbans = message.guild.fetchBans();
        const bannedMembers = await(await (fetchbans)).map((member) => `\`${member.user.tag} (${member.user.id})\``).join('\n\n')

        if(!bannedMembers) return message.channel.send('Wow there are no banned members in this server!')

        if (bannedMembers.length > 2000) {
            return message.channel.send(
              `${emoji.error} I'm sorry but, my limit is 2000 characters only!`
            );
        }
        message.channel.send(bannedMembers)
    }
}