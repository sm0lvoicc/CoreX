const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'anti-alt',
    description: 'set/disable anti-alt',
    timeout: 3000,
    usage: '<set> <days> <avatar: true or false> || <disable>',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['KICK_MEMBERS'],
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
        if (!opt) return message.channel.send("Please enter either **set** or **disable**")

        if(opt == 'set') {
            const days = args[1]
            if(!days || isNaN(days) || days < 0) return message.channel.send('Please specify a minimum account age')
            const avatar = args[2]
            if(!['true', 'false'].includes(avatar)) return message.channel.send('Please specify either **set** or **disable**')

            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) {
                   if(avatar == 'false') {
                       newData = new schema({
                           Guild: message.guild.id,
                           Avatar: false,
                           Days: days
                       })
                       newData.save()
                       message.channel.send(
                        new MessageEmbed()
                        .setTitle('<:corexinfo:860565886111580172> Anti-Alt Settings')
                        .setDescription(`Days: \`${days}\`\nAvatar: \`${avatar}\``)
                    )
                   }

                   if(avatar == 'true') {
                    newData = new schema({
                        Guild: message.guild.id,
                        Avatar: true,
                        Days: days
                    })
                    newData.save()
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle('<:corexinfo:860565886111580172> Anti-Alt Settings')
                        .setDescription(`Days: \`${days}\`\nAvatar: \`${avatar}\``)
                    )
                }
                } else {
                    data.delete()
                    if(avatar == 'false') {
                        newData = new schema({
                            Guild: message.guild.id,
                            Avatar: false,
                            Days: days
                        })
                        newData.save()
                        message.channel.send(
                         new MessageEmbed()
                         .setTitle('<:corexinfo:860565886111580172> Anti-Alt Settings')
                         .setDescription(`Days: \`${days}\`\nAvatar: \`${avatar}\``)
                     )
                    }
 
                    if(avatar == 'true') {
                     newData = new schema({
                         Guild: message.guild.id,
                         Avatar: true,
                         Days: days
                     })
                     newData.save()
                     message.channel.send(
                         new MessageEmbed()
                         .setTitle('<:corexinfo:860565886111580172> Anti-Alt Settings')
                         .setDescription(`Days: \`${days}\`\nAvatar: \`${avatar}\``)
                     )
                 }
                }
            })
        }

        if(opt == 'disable'){
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.channel.send('<:corexerror:860580531825147994> Anti-Alt is already disabled')
                data.delete()
                message.channel.send(`<:corexyes:860561725916053514> Anti-Alt is disabled`)
            })
        }
    }
}