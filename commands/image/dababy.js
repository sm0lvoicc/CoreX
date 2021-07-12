const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
    name: "dababy",
    description: "",
    timeout: 5000,
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0] ? args[0].toLowerCase() : undefined) || message.author;
        const loadingmsg = await message.channel.send(`<:corexloading:862075735748116511>`)
        const canvas = Canvas.createCanvas(867, 892);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://cdn.suchavoice.com/wp-content/uploads/sites/388/2017/09/20142830/transparent-image.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg', size: 4096 }));
        const daboy = await Canvas.loadImage('https://media.discordapp.net/attachments/819812451520479252/827777061392220210/G3fJ8jBVK0dwAAAAAElFTkSuQmCC.png');
        ctx.drawImage(avatar, 260, 270, 370, 370);
        ctx.drawImage(daboy, 0, 0, canvas.width, canvas.height);
        const attach = new Discord.MessageAttachment(canvas.toBuffer(), `Da${member.username}.jpg`);
        await loadingmsg.delete();
        message.channel.send(attach)

    }
}