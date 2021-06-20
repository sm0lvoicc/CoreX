const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'Locks a channel until unlocked',
    timeout: 5000,
    usage: '[#channel]',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I do not have the permission \`MANAGE_CHANNELS\`')

        let channel = message.mentions.channels.first();
        let reason;
        if(channel) {
          reason = args.slice(1).join(" ") || "No reason specified."
        } else if(!channel) {
          reason = args.join(" ") || "No reason specified.";
          channel = message.channel
        }

        const everyone = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(!channel.permissionsFor(everyone).has(["SEND_MESSAGES"])) return message.channel.send('This channel is already locked.')
        
        await channel.createOverwrite(client.user, {
            SEND_MESSAGES: true,
        },`CoreX Moderation - Lock Command - Actioned By: ${message.author.tag}`)
        await channel.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
        },`CoreX Moderation - Lock Command - Actioned By: ${message.author.tag}`)
        channel.send(new MessageEmbed().setDescription(`**${message.author.tag}** locked this channel for: \`${reason}\``).setColor("GREEN"))
        .catch(err => {
            message.channel.send(`There has been an error: **${err}**`)
        })
    }
}