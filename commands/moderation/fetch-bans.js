const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fetch-bans',
    aliases: ['bans', 'banned'],
    description: 'Shows banned members',
    timeout: 9000,
    usage: '',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have the permission \`BAN_MEMBERS\`');

        const fetchbans = message.guild.fetchBans();
        const bannedMembers = await(await (fetchbans)).map((member) => `\`${member.user.tag} (${member.user.id})\``).join('\n\n')

        if(!bannedMembers) return message.channel.send('Wow there are no banned members in this server!')

        if (bannedMembers.length > 2000) {
            return message.channel.send(
              `I'm sorry but, my limit is 2000 characters only!`
            );
        }
        message.channel.send(bannedMembers)
    }
}