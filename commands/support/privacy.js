const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'privacy',
    description: 'Shows the privacy policy',
    timeout: 1000,
    usage: '',
    aliases: [''],
    userPerms: [''],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(
            `Your privacy is the number one responsibility that we hold and in CoreX Development we take privacy very seriously and we understand any concern that may come.\n
            CoreX Develepment Doesn't store any data that is not beneficial for CoreX, We only store the necessary data for you to be able to use the bot properly.\n
            We only retain collected information for as long as necessary to provide you with your requested service.\n
            What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.\n
            We don’t share any personally identifying information publicly or with third-parties, except when required to by law.\n
            `
        )
        .setTimestamp()
        .setFooter('Your privacy matters')
        message.channel.send(embed)
    }
}