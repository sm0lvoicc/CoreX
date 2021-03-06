const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
module.exports = {
    name: 'reminder',
    timeout: 1000,
    usage: '<time> <reason>',
    aliases: ['remindme', 'remind'],
    description: 'Sends a reminder after a given period of time.',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let time = args[0]
        if(!time) return message.channel.send("What is the time when the reminder should be off?")
        if(ms(time) > ms("3w")) return message.channel.send(`${message.author.tag} You cannot set your reminder for more than 1 month`)

        let alert = args.slice(1).join(" ")
        if(!alert) return message.channel.send(`What is reminder for?`)
        let embed = new MessageEmbed()
        .setAuthor(`${message.author.tag} Your reminder has been set!`)
        .setColor("RANDOM")
        .addField(`Time:`, `\`${time}\``, true)
        .addField(`For:`, `\`${alert}\``, true)
        message.channel.send(embed)
        setTimeout(() => {
            let remindEmbed = new MessageEmbed()
            .setAuthor(`Your reminder is off!`)
            .setColor("RANDOM")
            .addField("Duration", `\`${time}\``, true)
            .addField(`Reason:`, `\`${alert}\``, true)
            message.channel.send(message.author, remindEmbed)
        }, ms(time))
    }
}