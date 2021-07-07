const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const { confirmation } = require('@reconlx/discord.js')
const { Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name : 'reset-prefix',
    timeout: 6000,
    description: 'Resets the bot\'s prefix to `?`',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: [''],
    run : async(client, message, args) => {
        message.channel.send(new MessageEmbed()
        .setColor('RANDOM')
        .setDescription("Are you sure you want to reset the prefix?")
        ).then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setDescription(`${emoji.success} The prefix has been reset to \`${prefix}\``)
                )
            }
            if(emoji === '❌') {
                msg.delete()
                message.channel.send(`${emoji.error} reset prefix has been cancelled.`)
            }
        })

    }
}