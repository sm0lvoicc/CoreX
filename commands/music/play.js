// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: 'play',
//     description: 'plays a song',
//     usage: 'Play <link/name of song>',
//     timeout: 5000,
//     userPerms: ['SEND_MESSAGES'],
//     clientPerms: ['SEND_MESSAGES'],

//     run: async(client, message, args) => {
//         if (!message.member.voice.channel) {
//             const playError = new MessageEmbed()
//               .setDescription("You Need to be in a Voice Channel to play Music!")
//               .setColor("RED")
//             return message.channel.send(playError)
//           }
//           const voiceChannel = message.member.voice.channel
//           const permissions = voiceChannel.permissionsFor(message.client.user)
//           if (!permissions.has("SPEAK")) {
//             const playError2 = new MessageEmbed()
//               .setDescription("I Don\'t Have Permissions to Speak in the Voice Channel")
//               .setColor("RED")
//             return message.channel.send(playError2)
//           }
//           if (!permissions.has("CONNECT")) {
//             const playError3 = new MessageEmbed()
//               .setDescription("I Don\'t Have Permissions to Connect to the Voice Channel")
//               .setColor("RED")
//             return message.channel.send(playError3)
//           }
    
//           let songName = args.slice(0).join(" ")
//           if (!songName) {
//             const playError2 = new MessageEmbed()
//               .setDescription("You Need to provide a Song name or URL!")
//               .setColor("RED")
//             return message.channel.send(playError2)
//           }
    
//           try {
//             client.player.play(message, songName)
//           } catch (err) {
//             message.channel.send(`There Has been an Error while playing the song! \n Error: ||${err}||`)
//           }
//     }
// }