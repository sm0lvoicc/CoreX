const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlocks a locked channel.',
    timeout: 5000,
    usage: '<#channel>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I do not have the permission \`MANAGE_CHANNELS\`')

        let channel = message.mentions.channels.first();
       if(!channel) {
           channel = message.channel
       }
       if(!channel) return message.reply('Mention a channel to unlock')
        const everyone = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(channel.permissionsFor(everyone).has(["SEND_MESSAGES"])) return message.channel.send('This channel is already unlocked.')
        await channel.createOverwrite(client.user, {
            SEND_MESSAGES: null,
        },`CoreX Moderation - Unlock Command - Actioned By: ${message.author.tag}`)
        await channel.updateOverwrite(everyone, {
            SEND_MESSAGES: null,
        },`CoreX Moderation - Unlock Command - Action By: ${message.author.tag}`)
        channel.send(new MessageEmbed().setDescription(`**${message.author.tag}** unlocked this channel`).setColor("GREEN"))
        .catch(err => {
            console.log(err)
            message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`**${error} An error occured when I'm trying to unlock this channel**`).setColor("RED"))
        })

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}