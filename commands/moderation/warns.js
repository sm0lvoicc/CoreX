const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
    name :'warns',
    description: 'Shows the warns for a specified user',
    timeout: 7000,
    usage: '<@user | user.id>',
    aliases: ['warnings', 'strikes'],
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
     run: async(client, message, args) => {

        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.channel.send('Please mention a member to see there warns')
        }
        
        

               
        db.findOne({ guildId: message.guild.id, User: member.user.id}, async(err, data) => {
            if(err) throw err;
            try {
              if(data.content.length) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${emoji.settings} ${member.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : \`${w.reason}\`\n Warn ID: \`${w.ID}\``
                        )
                    )
                    .setColor("RANDOM")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${emoji.error} This user has no warns!`)
                )
            } 

        } catch(err) {
                message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${emoji.error} This user has no warns!`)
                )
        }

        })
    
    }
}