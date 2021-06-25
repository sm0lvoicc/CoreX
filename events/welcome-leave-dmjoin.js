const client = require('../index')
const welcomeSchema = require('../models/welcome-channels')
const leaveSchema = require('../models/leave-channels')
const dmMessage = require('../models/dmjoin')

client.on('guildMemberAdd', async (member) => {
  welcomeSchema.findOne({
    Guild: member.guild.id
  }, async (err, data) => {
    if (err) throw err
    if (!data) return;
    const channel = await member.guild.channels.cache.get(data.Channel)
    if (!channel) return data.delete()
    const text = data.Text
    const welcomeMessage = text.replace(/{user}/, `${member}`).replace(/{server}/, member.guild.name).replace(/{user.tag}/, member.user.tag).replace(/{user.id}/, member.user.id).replace(/{membercount}/, member.guild.memberCount)
    channel.send(welcomeMessage)
  })
  dmMessage.findOne({
    Guild: member.guild.id
  }, async (err, data) => {
    if (err) throw err
    if (!data) return;
    const text = data.Text
    const user = text.replace(/{user}/, `${member}`).replace(/{server}/, member.guild.name).replace(/{user.tag}/, member.user.tag).replace(/{user.id}/, member.user.id).replace(/{membercount}/, member.guild.memberCount)
    try {
      await member.send(user)
    } catch (err) {
      return;
    }
  })
})

client.on('guildMemberRemove', async (member) => {
  leaveSchema.findOne({
    Guild: member.guild.id
  }, async (err, data) => {
    if (err) throw err
    if (!data) return;
    const channel = await member.guild.channels.cache.get(data.Channel)
    if (!channel) return data.delete()
    const text = data.Text
    const leaveMessage = text.replace(/{user}/, `${member}`).replace(/{server}/, member.guild.name).replace(/{user.tag}/, member.user.tag).replace(/{user.id}/, member.user.id).replace(/{membercount}/, member.guild.memberCount)
    channel.send(leaveMessage)
  })
})


client.on('guildDelete', async (guild) => {
  welcomeSchema.findOne({
    Guild: guild.id
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      welcomeSchema.findOneAndDelete({
        Guild: guild.id
      }).then(console.log('deleted data.'))
    }
  })
})

client.on('guildDelete', async (guild) => {
  leaveSchema.findOne({
    Guild: guild.id
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      leaveSchema.findOneAndDelete({
        Guild: guild.id
      }).then(console.log('deleted data.'))
    }
  })
})

client.on('guildDelete', async (guild) => {
  welcomeSchema.findOne({
    Guild: guild.id
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      dmMessage.findOneAndDelete({
        Guild: guild.id
      }).then(console.log('deleted data.'))
    }
  })
})