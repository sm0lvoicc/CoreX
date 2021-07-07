const { MessageEmbed } = require('discord.js')
const schema = require('../../models/reaction-roles')
const emoji = require('../../emoji.json')

module.exports = {
  name: 'rr-remove',
  description: "Remove a reaction roles",
  timeout: 50000,
  aliases: ['removerr', 'reaction-role-add'],
  usage: '<#channel> <message.id> <@role || role.id> <emoji>',
  userPerms: ['ADMINISTRATOR'],
  clientPerms: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const msg1 = args[1]
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    let emoji = args[3]
    
    if (!channel) return message.channel.send(`You must provide channel`)
    if (!msg1) return message.channel.send(`You must provide message ID`)
    if (!role) return message.channel.send(`You must provide role to remove`)
    if (!emoji) return message.channel.send(`You must provide emoji`)
    
    function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true
    }
    
    if (isCustomEmoji(emoji)) return message.channel.send(`I currently do not support custom emojis.`)
    
    try {
    let msg = await channel.messages.fetch(msg1)
    }catch(err) {
      return message.channel.send(`${emoji.error} I can't find Message ID \`${msg1}\` in ${channel}`)
    }
    
    let msg = await channel.messages.fetch(msg1)
    schema.findOne({
      Guild: message.guild.id,
      Channel: channel.id,
      Message: msg.id,
      Emoji: emoji,
    }, async (err, data) => {
      if (!data) return message.channel.send(`This Reaction Roles does not exist`);
      await data.delete()
      message.channel.send(new MessageEmbed()
      .setTitle(`${emoji.success} Reaction Roles Removed`)
      .addField(`${emoji.mention} Role`, role, true)
      .addField(`${emoji.channel} Channel`, channel , true)
      .addField(`${emoji.message} Message`, msg.id , true)
      .addField(`${emoji.inbox} Emoji`, emoji, true)
      .setColor("RED")
      .setTimestamp()
      .addField(`${emoj.link} Link`, `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`))
    })
  }
}