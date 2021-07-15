// const Discord = require("discord.js");
// const client = require("../../index.js");
// module.exports = {
//   name: "invite",
//   description: "Invite this bot to your server!",
//   usage: "invite",
//   timeout: 1000,
//   aliases: ["inviteme"],
//   userPerms: ["SEND_MESSAGES"],
//   clientPerms: ["SEND_MESSAGES"],

//   run: async (client, message, args) => {
//     const embed = new MessageEmbed()
//               .setTitle(`${message.client.user.username} Bot Invite`),
//               .setColor(`RANDOM`),
//               .setTimestamp(),
//               .setFooter(
//                 message.client.user.username,
//                 message.client.user.displayAvatarURL(),),
//               .setThumbnail(message.client.user.avatarURL()),
//               .setDescription( `🗒️**Note:**This bot requires \`ADMINISTRATOR\` permissions. Adding this bot will give the bot all permissions on your server!`),
//              .addField(`**Links:**`, `[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=819643325177921587&permissions=8&redirect_uri=https%3A%2F%2Fadmin.corexbot.com%2Flogin%2Fapi&scope=bot) | [Support Server](https://discord.gg/DZ5f8WupQ6)`),
             
//             message.channel.send(embed)
//           }
//         }
