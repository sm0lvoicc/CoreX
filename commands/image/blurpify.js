const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'blurpify',
    description: 'Blurpify an avatar',
    timeout: 5000,
    usage: '[@user]',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first()

        if(!user) {
            user = message.author
        }

        const url = await fetch(
            `https://nekobot.xyz/api/imagegen?type=blurpify&image=${user.displayAvatarURL({ size: 512 })}`
          ).then((res) => res.json());

        message.channel.send(new MessageEmbed().setColor('BLURPLE').setImage(url.message));
    }
}