// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: 'queue',
//     description: "Gives you the server queue list!",
//     usage: "queue",
//     aliases: ["q"],
//     timeout: 5000,
//     userPerms: ['SEND_MESSAGES'],
//     clientPerms: ['SEND_MESSAGES'],
//     run: async(client, message, args) => {
//         if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You need to be in the same voice channel as me.`);
//         let queue = client.player.getQueue(message);
//         if (!queue) {
//             const queueError = new MessageEmbed()
//             .setDescription("There is nothing in the queue.")
//             .setColor("RED")
//             return message.channel.send(queueError)
//         }
//         let i = 0
//         message.channel.send(`**Server queue - ${message.guild.name} ${queue.loopMode ? '(looped)' : ''}**\`\`\`\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track) => {
//             i++;
//             return `#${i} - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
//         }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And ${queue.tracks.length - 5} other songs...` : `In the playlist ${queue.tracks.length} song(s)...`}\`\`\``));
//     }
// }