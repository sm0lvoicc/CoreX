// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: 'nowplaying',
//     description: "Shows you the current playing song",
//     usage: "nowplaying",
//     aliases: ["np"],
//     timeout: 5000,
//     userPerms: ['SEND_MESSAGES'],
//     clientPerms: ['SEND_MESSAGES'],
//     run: async(client, message, args) => {
//         if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You need to be in the same voice channel as me.`);
//         let queue = client.player.getQueue(message);
//         if (!queue) {
//             const queueError = new MessageEmbed()
//             .setDescription("There is nothing currently playing.")
//             .setColor("RED")
//             return message.channel.send(queueError)
//         }

    
//         const track = client.player.nowPlaying(message);
//         const filters = [];

//         Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

//         let duration = track.duration;
//         if(track.duration === '0:00') duration = "LIVE";
//         message.channel.send({
//             embed: {
//                 color: 'RED',
//                 author: { name: track.title },
//                 footer: { text: 'Core X' },
//                 fields: [
//                     { name: 'Channel', value: track.author, inline: true },
//                     { name: 'Requested by', value: track.requestedBy.username, inline: true },
//                     { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

//                     { name: 'Views', value: track.views, inline: true },
//                     { name: 'Duration', value: duration, inline: true },
//                     { name: 'Filters activated', value: filters.length + '/' + client.filters.length, inline: true },

//                     { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
//                     { name: 'Repeat mode', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
//                     { name: 'Currently paused', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

//                     { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
//                 ],
//                 thumbnail: { url: track.thumbnail },
//                 timestamp: new Date(),
//             },
//         });
//     }
// }