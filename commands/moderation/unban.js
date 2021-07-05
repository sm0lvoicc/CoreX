const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Unbans specified member.',
    usage: '<user-id> [reason]',
    timeout: 9000,
    userPerms: ['BAN_MEMBERS'],
    clientPerms: ['BAN_MEMBERS'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        try {
            const userUnban = args[0];
    
            let unBanReason = args.slice(1).join(' ');
    
            if(!unBanReason) {
                unBanReason = 'No reason specified'
            }
    
            if(!userUnban) message.channel.send('Please specify a user id, to unban');
    
            const bannedMembers = await message.guild.fetchBans();
    
            if(!bannedMembers.find((user) => user.user.id ===  userUnban)) return message.channel.send('This user is not banned');
    
            message.guild.members.unban(userUnban);
    
            message.channel.send(new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`<:corexyes:860561725916053514> <@${userUnban}> has been successfully unbanned `)
            )

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}