const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'lock',
    description: 'Locks a channel until unlocked',
    timeout: 5000,
    usage: '[#channel]',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_CHANNELS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {

        let channel = message.mentions.channels.first();
        let reason;
        if(channel) {
          reason = args.slice(1).join(" ") || "No reason specified."
        } else if(!channel) {
          reason = args.join(" ") || "No reason specified.";
          channel = message.channel
        }

        const everyone = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(!channel.permissionsFor(everyone).has(["SEND_MESSAGES"])) return message.channel.send(`${emoji.error} This channel is already locked.`)
        
        await channel.createOverwrite(client.user, {
            SEND_MESSAGES: true,
        },`CoreX Moderation - Lock Command - Actioned By: ${message.author.tag}`)
        await channel.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
        },`CoreX Moderation - Lock Command - Actioned By: ${message.author.tag}`)
        channel.send(new MessageEmbed().setDescription(`${emoji.lock} **${message.author.tag}** locked this channel for: \`${reason}\``).setColor("GREEN"))
        .catch(err => {
            message.channel.send(`There has been an error: **${err}**`)
        })
        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}