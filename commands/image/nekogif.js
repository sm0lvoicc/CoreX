const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "nekogif",
  description: "sends random nekogif",
  timeout: 3000,
  usage: "",
  aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
  

        async function work() {
        let owo = (await neko.sfw.nekoGif());

        const nekogif = new Discord.MessageEmbed()
        .setTitle("Random Neko Gif")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(nekogif);

}

      work();
}
                };
