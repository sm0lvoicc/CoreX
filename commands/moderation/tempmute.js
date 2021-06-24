const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
const schema = require('../../models/mutes')

module.exports = {
    name: 'tempmute',
    description: 'Temp mutes mentioned member',
    timeout: 10000,
    usage: '<@member || member.id> <time> [reason]',
    aliases: ['t-mute'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply(`You do not have the permission \`MANAGE_ROLES\``)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return  message.reply(`I do not have the permission \`MANAGE_ROLES\``)

        let member = message.mentions.members.first() 
        if(!member) {
            member = message.guild.members.cache.get(args[0])
        }
        if(!member) return message.reply('Please mention a user to tempmute')

        const time = args[1]
        const muteReason = args.slice(2).join(" ") || "No muteReason specified"
        
        if(member.user.id === message.author.id) return message.reply(`You cannot mute yourself`);
        if(!time) return  message.reply(`Please set a time to mute the user for.`)

        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                message.channel.send(`No Muted role found! Please set the mute role using ${prefix}set-muterole <@role>`)
            } else {
                const MuteRole = message.guild.roles.cache.find(role => role.id === data.Role)
                if(!MuteRole) return message.channel.send(`The Muted Role for this server was deleted. Please set the mute role using ${prefix}set-muterole <@role>`)
                if(member.roles.cache.get(MuteRole.id)) return message.channel.send(new MessageEmbed()
          .setDescription(`**${member.user.username} was muted already. So I cannot mute them again**`)
          .setColor("RED")
          .setFooter(
              `Requested by ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
      )
      if(member.roles.highest.position >= message.member.roles.highest.position) return  message.reply('You cannote mute a person higher/equal than you')
      if(MuteRole.position >= message.guild.me.roles.highest.position) return message.reply(`The mute role is higher/equal to my role.`)
     await member.roles.add(MuteRole.id)

      message.channel.send(new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`${member} has been tempmuted for: ${time} because: \`${muteReason}\``)
      .setTimestamp()
      )
      .catch(err => console.log(err))

  const dmEmbed = new MessageEmbed()
  .setColor('RED')
  .setDescription(`**Server:** ${message.guild.name}\n**Moderator:** ${message.author}\n**Action:** Tempmute\n**Duration:** ${time}\n**Reason:** ${muteReason}`)
  .setTimestamp()

  try{
      await member.send(dmEmbed)
  } catch(e) {
    message.channel.send('I could not DM the user! Reason logged.')
    console.log('An error occured while sending the DM embed! ' + e)
  }
setTimeout(async function () {
    await member.roles.remove(MuteRole.id)
    message.channel.send(new MessageEmbed()
        .setDescription(` ${member.user.username} was unmuted || muteReason: \`Mute Duration was expired\``)
        .setColor("GREEN")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    }, ms(time))
}
})

client.modlogs ({
    Member: member,
    Color: 'RED',
    Reason: muteReason,
    Action: 'Tempmute'
}, message)


        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
}}