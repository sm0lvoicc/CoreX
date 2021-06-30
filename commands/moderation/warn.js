const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'Warns the specified user.',
    usage: '<@user | user-id> [reason]',
    timeout: 4000,
    aliases: ['strike'],
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');


        let user  = message.mentions.members.first()

        if (!user ) {
            user  = await message.guild.members.cache.get(args[0])
        }

        if (!user ) {
           message.reply('Please mention a member to warn')
        }
        
        
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_MESSAGES\`');
       
        let warnReason = args.splice(1).join(' ');
        if(!warnReason) {
            warnReason = 'No reason specified.'
        }

        if (user  === message.member) return message.reply('You cannot warn yourself');

        if (user === message.guild.me) return message.reply('You cannot warn me');

        function generateRandomString(length){
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
            var random_string = '';
            if(length > 0){
              for(var i=0; i < length; i++){
                  random_string += chars.charAt(Math.floor(Math.random() * chars.length));
              }   
    }
    return random_string  
    }
    const random = generateRandomString(10)

        db.findOne({guildId: message.guild.id, User: user.user.id }, async(err, data) => {
            if(err) throw err;

            if(!data) {
                data = new db({
                    guildId: message.guild.id,
                    User: user.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: warnReason,
                            ID: random
                        }
                    ]
                })
            }else {
                const obj = {
                    moderator: message.author.id,
                    reason: warnReason,
                    ID: random
                }
                data.content.push(obj)
            }
            data.save()
        });

        message.channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${user} was warned by ${message.author} for: \`${warnReason}\``)
        .setFooter(`Warn ID: ${random}`)
        .setTimestamp()
        )

      
        const userSend = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**Server:** ${message.guild.name}\n**Moderator:** ${message.author}\n**Action:** Warn\n**Reason:** ${warnReason}\n**Warn ID:** \`${random}\``)
        .setTimestamp()
        try {
            user.send(userSend)
        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }

        client.modlogs({
            Member: user,
            Reason: warnReason,
            Color: 'RED',
            Action: 'Warn'
        }, message)

    }
}