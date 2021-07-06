const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'alt-logs',
    description: 'Sets/disables alt logging.',
    timeout: 5000,
    usage: '<set/disable>',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        options = [
            'set',
            'disable'
        ]

        if (!args.length) return message.channel.send("Please enter either **set** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **set** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **set** or **disable**')

        if(opt === 'set') {
            const channel = await message.mentions.channels.first()
            if(!channel) return message.channel.send('Please mention a channel to set as the alt logs')

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    const newData = new schema({
                        Guild: message.guild.id,
                        Days: 7,
                        Avatar: false,
                        Channel: channel.id
                    })
                    newData.save()
                    const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`<:corexyes:860561725916053514> Alt-logs is set to  ${channel}`)
                    .setTimestamp()
                    message.reply(embed)
                } else{
                    data.updateOne({
                        Channel: channel.id
                    })

                    const embed2 = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`<:corexyes:860561725916053514> Alt-logs is set to  ${channel}`)
                    .setTimestamp()
                    message.reply(embed2)
            }
        })
    }

    if(opt === 'disable') {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) message.channel.send('<:corexerror:860580531825147994> The Alt-logs is already disabled')
            data.deleteOne(Channel)
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription('<:corexyes:860561725916053514> Alt logging has been disabled')
            .setTimestamp()
            message.channel.send(embed)
        })
    }

    }
}