const { Client, Message, MessageEmbed } = require('discord.js')
const emoji = require('../../emoji.json')


module.exports = {
    name: 'nick',
    timeout: 3000,
    description: 'Changes the nickname of a user.',
    usage: '<@user>',
    aliases: ['set-nick', 'setnick'],
    userPerms: ['MANAGE_NICKNAMES'],
    clientPerms: ['MANAGE_NICKNAMES'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      try {        
        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.channel.send('Please mention a member to change there nick')
        }
    
        const arguments = args.slice(1).join(" ");
    
        if (!arguments) return message.channel.send("Please specify a nickname!");
        if(member.id == message.member.id) return message.channel.send(`${emoji.error} You cannot nick yourself`)

        if (message.member.roles.highest.position <= member.roles.highest.permission) return message.channel.send(`${emoji.error} You cannot nick this member due to role heirarchy issues.`);
        if (message.guild.me.roles.highest.position <= member.roles.highest.permission) return message.channel.send(`${emoji.error} I cannot nick this member due to role heirarchy issues.`);
    
        try {
          member.setNickname(arguments);
          const embed = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`${emoji.success} **${member.user.tag}** has been nicked to ${arguments} `)
          .setTimestamp()
          message.channel.send(embed)
        } catch (err) {
          message.channel.send(
            `${emoji.success} I do not have permission to set ` + member.toString() + " nickname!"
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