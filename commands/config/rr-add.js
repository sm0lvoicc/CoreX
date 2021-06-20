const { MessageEmbed } = require('discord.js')
const schema = require('../../models/reaction-roles')

module.exports = {
  name: 'rr-add',
  description: "Adds a reaction roles",
  timeout: 50000,
  aliases: ['addrr', 'reaction-role-add'],
  usage: '<#channel> <message.id> <@role || role.id> <emoji> ',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)
    
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const msg1 = args[1]
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    let emoji = args[3]

    if (!channel) return message.channel.send(`You must provide channel`)
    if (!msg1) return message.channel.send(`You must provide message ID`)
    if (!role) return message.channel.send(`You must provide role to add`)
    if (!emoji) return message.channel.send(`You must provide emoji`)

    if(role.position >= message.guild.me.roles.highest.position) return message.reply('I cannot add a role that is higher/equal to my role')

    
    function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true
    }
    
    if (isCustomEmoji(emoji)) return message.channel.send(`I currently do not support custom emojis.`)
    
    try {
    let msg = await channel.messages.fetch(msg1)
    }catch(err) {
      return message.channel.send(`I can't find the Message ID \`${msg1}\` in ${channel}`)
    }
   
    let msg = await channel.messages.fetch(msg1)

    schema.findOne({
      Guild: message.guild.id,
      Channel: channel.id,
      Message: msg.id,
      Emoji: emoji
    }, async (err, data) => {
      if (data) return message.channel.send(`This Reaction Roles already existes`);
      
      try {
      await msg.react(emoji)
      }catch(err) {
        return message.channel.send(`Please provide valid emoji`)
      }

      new schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Message: msg.id,
        Emoji: emoji,
        Role: role.id
      }).save()

      message.channel.send(new MessageEmbed().setTitle(`Reaction Roles Added`).addField(`Role`, role, true).addField(`Channel`, channel , true).addField(`Message`, msg.id , true).addField(`Emoji`, emoji, true).setColor("GREEN").setTimestamp().addField(`Link`, `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`))
    })
  }
}