const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'get-premium',
    description: 'Get instructions on how to obtain premium.',
    timeout: 1000,
    usage: '',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const getEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('<:corexlike:860603776348192778> Great choice for picking our premium.')
        .setDescription(`To get premium just simply join the [Support Server](${config.invite}) and then head on over to [Patreon](https://www.patreon.com/corex_dev) and pick the premium tier\nThen just DM the owners that you bought the premium.`)
        .setFooter('Automatic premium system coming soon')
        message.channel.send(getEmbed)
    }
}