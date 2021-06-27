const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nick',
    timeout: 3000,
    description: 'Changes the nickname of a user.',
    usage: '<@user>',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      try {

        if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.reply('You do not have the permission \`MANAGE_NICKNAMES\`')
        if(!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.reply('I do not have the permission \`MANAGE_NICKNAMES\`')
        
        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.channel.send('Please mention a member to change there nick')
        }
    
        const arguments = args.slice(1).join(" ");
    
        if (!arguments) return message.reply("Please specify a nickname!");

        if (message.member.roles.highest.position <= member.roles.highest.permission) return message.channel.send('The target has a higher position than you.');
        if (message.guild.me.roles.highest.position <= member.roles.highest.permission) return message.channel.send('The target has a higher position than me.');
    
        try {
          member.setNickname(arguments);
          const embed = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`**${member.user.tag}** has been nicked to ${arguments} `)
          .setTimestamp()
          message.channel.send(embed)
        } catch (err) {
          message.reply(
            "I do not have permission to set " + member.toString() + " nickname!"
          );
        }

         
        client.modlogs ({
            Member: member,
            Color: 'RED',
            Reason: 'Nickname changed',
            Action: 'Nick'
        }, message)
        
      } catch(e) {
        message.channel.send(`There has been an error, **${e}**`)
      }
    }
}