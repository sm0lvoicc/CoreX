const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Unbans specified member.',
    usage: '<user-id> [reason]',
    timeout: 9000,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])) return message.reply('You do not have the permission \`BAN_MEMBERS\`');
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the permission \`BAN_MEMBERS\` ;-;');
        const userUnban = args[0];

        let unBanReason = args.slice(1).join(' ');

        if(!unBanReason) {
            unBanReason = 'No reason specified'
        }

        if(!userUnban) message.reply('Oy are you retarded or something? Pass in a user id bruh.');

        const bannedMembers = await message.guild.fetchBans();

        if(!bannedMembers.find((user) => user.user.id ===  userUnban)) return message.channel.send('Lmfao the user is not banned. Ironic');

        message.guild.members.unban(userUnban);

        message.channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`<@${userUnban}> has been successfully unbanned `)
        )
    }
}