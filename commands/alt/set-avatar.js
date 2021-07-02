const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'set-avatar',
    description: 'Kick users with defualt avatars',
    timeout: 3000,
    usage: '<True/False>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINSTRATOR\`')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission \`KICK_MEMBERS\`')

        
        options = [
            'true',
            'false'
        ]
  
        if (!args.length) return message.reply("Please enter either **true** or **false**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply("Please enter either **true** or **false**")

        if(opt == 'true') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) {
                    new schema({
                        Guild: message.guild.id,
                        Days: 7,
                        Avatar: true
                    })
                    message.channel.send('<:corexyes:860561725916053514> Enabled kick default avatars')
                } else {
                    data.updateOne({
                        Avatar: true
                    })
                    message.channel.send('<:corexyes:860561725916053514> Enabled kick default avatars')

                }
            })
        }

        if(opt == 'false') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) {
                    new schema({
                        Guild: message.guild.id,
                        Days: 7,
                        Avatar: false
                    }).save()
                    message.channel.send('<:corexyes:860561725916053514> Disabled kick default avatars')
                } else {
                    data.updateOne({
                        Avatar: false
                    })
                    message.channel.send('<:corexyes:860561725916053514> Disabled kick default avatars')
                }
            })
        }
  
    }
}