const prefixSchema = require('../../models/prefix')
const { Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'prefix',
    description: 'Changes the bot prefix.',
    timeout: 7000,
    usage: '<prefix>',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You do not have the permission \`MANAGE_SERVER\`')
        
        
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.delete();
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Your prefix has been updated to \`${res}\``)
                .setTimestamp()
                )
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Custom prefix in this server is now set to \`${res}\``)
                .setTimestamp()
                )
            }
        })
    }
}