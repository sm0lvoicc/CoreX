const { MessageEmbed } = require('discord.js')
const schema = require('../../models/reaction-roles')

module.exports = {
  name: 'rr-remove',
  description: "Remove a reaction roles",
  timeout: 50000,
  aliases: ['removerr', 'reaction-role-add'],
  usage: '<#channel> <message.id> <@role || role.id> <emoji>',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)
    
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
      return message.channel.send(`<:corexerror:860580531825147994> I can't find Message ID \`${msg1}\` in ${channel}`)
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
      .setTitle(`<:corexyes:860561725916053514> Reaction Roles Removed`)
      .addField(`<:corexmention:860565536835502110> Role`, role, true)
      .addField(`<:corexchannel:860560876792840202> Channel`, channel , true)
      .addField(`<:corexchat:860569658657865728> Message`, msg.id , true)
      .addField(`<:corexinbox:860563596818513920> Emoji`, emoji, true)
      .setColor("RED")
      .setTimestamp()
      .addField(`<:corexlink:860584013189742612> Link`, `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`))
    })
  }
}