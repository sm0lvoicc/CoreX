const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt-logs')

module.exports = {
    name: 'alt-logs',
    description: 'Sets/disables alt logging.',
    timeout: 5000,
    usage: '<set/disable>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        options = [
            'set',
            'disable'
        ]

        if (!args.length) return message.reply("Please enter either **set** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **set** or **disable**')


        if (!options.includes(opt)) return message.reply('Please enter either **set** or **disable**')

        if(opt === 'set') {
            const channel = await message.mentions.channels.first()
            if(!channel) return message.reply('Please mention a channel to set as the alt logs')

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    new schema({
                        Guild: message.guild.id,
                        Channel: channel
                    })
                    data.save()
                    message.reply(`Alt-logs is set to => ${channel}`)
                } else{
                    if(data) {
                        new schema({
                            Guild: message.guild.id,
                            Channel: channel
                        })
                        data.save()
                        message.reply(`Alt-logs is update to => ${channel}`)
                }
            }
        })
    }

    if(opt === 'disable') {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) message.reply('The Alt-logs is already disabled')
            data.delete()
            message.reply('Alt logging has been disabled')
        })
    }

    }
}