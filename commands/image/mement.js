const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: "mement",
    description: "",
    timeout: 5000,
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        const canvas = Canvas.createCanvas(500, 670);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/812590454821355543/815638766252195860/moment.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 150, 100, 205, 205);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `doggo_${member.user.username}.jpg`);
        message.channel.send(attachment)

    }
}