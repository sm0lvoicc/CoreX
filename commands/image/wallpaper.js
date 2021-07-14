const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "wallpaper",
  description: "sends random wallpaper",
  timeout: 3000,
  usage: "",
  aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {

        async function work() {
        let owo = (await neko.sfw.wallpaper());

        const wallpaper = new Discord.MessageEmbed()
        .setTitle("Random Wallpaper")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(wallpaper);

}

      work();
}
                };
