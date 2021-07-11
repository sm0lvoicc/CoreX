const db = require('quick.db');  
module.exports = {
    name: 'join',
    description: "Joins The Voice Channel",
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    usage: "join",
    aliases: ['summon'],
    timeout: 5000,
    run: async(client, message, args) => {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("You Are Not In a Voice Channel!")

        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            console.log(`There Was An Error Connecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
}