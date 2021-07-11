const client = require('../index')
const db = require('../models/logs-server');
const Discord = require('discord.js')


client.on("guildMemberRoleRemove", (member, role) => {
    db.findOne({ Guild: member.guild.id}, async(err, data) => {
        if(!data) return;
        const channel = member.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
        .setColor(`RED`)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`<@${member.user.id}> **has been updated.**`)
        .addField("Roles:", `${role}`, true)
        .setThumbnail(member.user.avatarURL({dynamic:true}))
        .setTimestamp();
        channel.send(embed)
    }) 
})
client.on("guildMemberRoleAdd", (member, role) => {
    db.findOne({ Guild: member.guild.id}, async(err, data) => {
        if(!data) return;
        const channel = member.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;
        const embed1 = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(`GREEN`)
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`<@${member.user.id}> **has been updated.**`)
                .addField("Roles:", `${role}`, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();
            channel.send(embed1)

    })
});