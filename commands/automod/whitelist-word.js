const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/whitelist-channel')

module.exports = {
    name: 'whitelist-word',
    description: 'Whitelist channel from a Anti-curse',
    timeout: 3000,
    usage: '<add/remove/dislay <#channel>',
    aliases: ['wl-link'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.reply('I do not have the permission \`MANAGE_SERVER\`')

        const options = [
            'add',
            'remove',
            'displays'
        ]

        if (!args.length) return message.reply("Please enter either **add**, **remove** or **display**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply("Please enter either **add**, **remove** or **display**")


        if (!options.includes(opt)) return message.reply("Please enter either **add**, **remove** or **display**")

        if(opt == 'add') {
            const channel = message.mentions.channels.first()

            if(!channel) return message.reply('Please mention a channel to whitelist')

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) {
                    const newData = new schema({
                        Guild: message.guild.id,
                        Anti_curse: channel.id
                    })
                    newData.save()
                    message.channel.send(`<:corexyes:860561725916053514> Whitelisted Bad Words in ${channel}`)
                } else {
                    if(data.Anti_curse.includes(channel.id)) return message.reply('<:corexerror:860580531825147994> This channel is already whitelisted')
                    data.Anti_curse.push(channel.id)
                    data.save()
                    message.channel.send(`<:corexyes:860561725916053514> Whitelisted Bad Words in ${channel}`)
                }
            })
        }

        if(opt == 'remove') {
            const channel = message.mentions.channels.first()

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('<:corexerror:860580531825147994> There are no channels whitelisted')
                if(!data.Anti_curse.includes(channel.id)) return message.reply(`<:corexerror:860580531825147994> ${channel} is not whitelisted`)
                const filtered = data.Anti_link.filter(target => target !== channel.id);

                await schema.findOneAndUpdate({ Guild: message.guild.id, Anti_curse: filtered})

                message.channel.send(`<:corexyes:860561725916053514> Removed whitelist from ${channel}`)
            })
        }

        if(opt == 'display') {
            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('<:corexerror:860580531825147994> There are no channels whitelisted')
                message.channel.send(
                    new MessageEmbed()
                    .setTitle(`<:corexinfo:860565886111580172> Whitelisted Channels`)
                    .setDescription(`<#${data.Anti_curse.join(`> <#`) || `**No channels whitelisted**`}>`)
                    .setColor("RANDOM")
                )
            })
        }
    }
}