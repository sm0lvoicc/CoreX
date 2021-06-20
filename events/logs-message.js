const client = require('../index')
const db = require('../models/logs-message')
const { MessageEmbed } = require('discord.js');
const pingSchema = require('../models/ghostping')

client.on('messageDelete', async(message) => {
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
        channel.send(messageDeleteEmbed);
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
      
      client.snipes.push({
        channel: message.channel,
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: new Date()
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