const db = require('../models/logs-message')
const client = require('../index')
const { MessageEmbed } = require('discord.js');

client.on('messageUpdate', async(oldMessage, newMessage) => {
    db.findOne({Guild: oldMessage.guild.id}, async(err, data) => {
        if (!newMessage.channel.guild || !newMessage.author) return;
        if (!oldMessage) return;
        if(!oldMessage.content === newMessage.content) return;
        if(newMessage.author.bot) return;
        if(newMessage.embeds[0]) return;
        if(!data) return;
        if(err) throw err;

        const channel = newMessage.guild.channels.cache.get(data.Channel);
		if(!channel || channel.available) return;
        

        const messageUpdateEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor('Message Edited', newMessage.guild.iconURL())
        .addField('Message Sent by', newMessage.author)
        .addField('Edited in', `${message.channel} | [Jump to message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
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