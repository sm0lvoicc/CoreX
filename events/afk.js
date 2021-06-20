const client = require('../index')
const db = require('quick.db')
const ms = require('ms')

client.on('message', async(message) => {
    if(!message.guild) return;
    if(message.author.bot) return;
    //message get afk person
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`I have removed your AFK!`)
    }
    //get mentioned afk
    if(message.mentions.members.first()) {
        const info = db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.reply(`**${message.mentions.members.first().user.username}** is AFK for: **${info}**`)
        } else return;
    }else;



})