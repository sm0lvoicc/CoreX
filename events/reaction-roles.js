const client = require('../index')
const reactionSchema = require('../models/reaction-roles');
const { MessageEmbed } = require('discord.js')

client.on("messageReactionAdd", async(messageReaction, user) => {
    const { message , emoji } = messageReaction;
    if(client.user.id == user.id) return;
    await reactionSchema.findOne({
      Guild: message.guild.id,
      Channel: message.channel.id,
      Message: message.id,
      Emoji: emoji
    }, async(err, data) => {
      if(!data) return
      const role = await message.guild.roles.cache.get(data.Role)
      if(!role) return data.delete()
      const member = await message.guild.members.cache.get(user.id)
      await member.roles.add(role)
      if(data.DM == false) return;
      await member.send(new MessageEmbed().setTitle(`Role Added`).setColor("GREEN").setDescription(`You were given role 
      \`${role.name}\` by reacting to ${emoji}`))
    })
  })
  
  client.on("messageReactionRemove", async(messageReaction, user) => {
    const { message , emoji } = messageReaction;
    if(client.user.id == user.id) return;
    await reactionSchema.findOne({
      Guild: message.guild.id,
      Channel: message.channel.id,
      Message: message.id,
      Emoji: emoji
    }, async(err, data) => {
      if(!data) return
      const role = await message.guild.roles.cache.get(data.Role)
      if(!role) return data.delete()
      const member = await message.guild.members.cache.get(user.id)
      await member.roles.remove(role)
      if(data.DM == false) return;
      await member.send(new MessageEmbed().setTitle(`Role Removed`).setColor("RED").setDescription(`You lost role 
      \`${role.name}\` by unreacting to ${emoji}`))
    })
})

client.on('guildDelete', async(guild) => {
    reactionSchema.findOne({ Guild: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        reactionSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
      }
})
})