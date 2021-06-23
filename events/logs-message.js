const client = require('../index')
const db = require('../models/logs-message')
const { MessageEmbed } = require('discord.js');
const pingSchema = require('../models/ghostping')

//message logging
client.on('messageDelete', async(message) => {
  if(!message.guild.id) return;
    db.findOne({ Guild: message.guild.id}, async(err, data) => {
        if(!data) return;
        if(err) throw err;
        if(message.author.bot) return;
        if(message.embeds[0]) return;
        const channel = message.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;
        if (message.author.bot) return;

        if (message.channel.type !== "text") return;
        const messageDeleteEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor('Message Deleted', message.guild.iconURL())
        .addField('Message Sent by', message.author)
        .addField('Deleted in', message.channel)
        .setDescription(`\`\`\`${message.content}\`\`\``)
        .setTimestamp(new Date())
        .setFooter(`Message ID: ${message.id}`)
        if(message.content.length >= 2000) return;

        channel.send(messageDeleteEmbed)
    })

    pingSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(!data) return;
        const member = message.mentions.members.first()
        if(member) {
            if(member.id == message.author.id) return;
            if(message.author.bot) return;
          message.channel.send(new MessageEmbed()
            .setTitle(`Ghost Ping Detected`)
            .addField(`Author`, message.author.tag, true)
            .addField(`Content`, message.content, true)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          )
        }
      })
      
    let snipes = client.snipes.get(message.channel.id) || [];
      if(snipes.length > 5) snipes = snipes.slice(0, 4)

      snipes.unshift({
        msg: message,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now()
      })

      client.snipes.set(message.channel.id, snipes)
})

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(!newMessage.guild) return;
  if(newMessage.author.bot) return;
  db.findOne({Guild: newMessage.guild.id}, async(err, data) => {
      if (!newMessage.channel.guild || !newMessage.author) return;
      if (!oldMessage) return;
      if(!oldMessage.content === newMessage.content) return;
      if(newMessage.embeds[0]) return;
      if(!data) return;
      if(err) throw err;

      const channel = newMessage.guild.channels.cache.get(data.Channel);
  if(!channel || channel.available) return;
      

      const messageUpdateEmbed = new MessageEmbed()
      .setColor('RED')
      .setAuthor('Message Edited', newMessage.guild.iconURL())
      .addField('Message Sent by', newMessage.author)
      .addField('Edited in', `${newMessage.channel} | [Jump to message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
      .addField('Old message', `\`\`\`${oldMessage.cleanContent}\`\`\``)
      .addField('New Message', `\`\`\`${newMessage.cleanContent}\`\`\``)
      .setTimestamp(new Date())
      .setFooter(`Message ID: ${newMessage.id}`)
      if(oldMessage.cleanContent.length >= 1000) return;
      if(newMessage.cleanContent.length >= 1000) return;
      if(oldMessage.cleanContent === newMessage.cleanContent) return;

      channel.send(messageUpdateEmbed)

  })
})

client.on('guildDelete', async (guild) => {
    db.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            db.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})