// module.exports = {
//     name: 'leave',
//     description: "Leaves The Voice Channel",
//     timeout: 5000,
//     aliases: ['dc', 'disconnect'],
//     userPerms: ['SEND_MESSAGES'],
//     clientPerms: ['SEND_MESSAGES'],
//     run: async(client, message, args) => {

//         const voiceChannel = message.member.voice.channel

//         if (!voiceChannel) return message.channel.send("I\'m Not In A Voice Channel")

//         try {
//             voiceChannel.leave()
//         } catch(error) {
//             console.log(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
//             return message.channel.send(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
//         }
//     }
// }