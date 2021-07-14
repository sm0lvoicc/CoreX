const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "foxgirl",
  description: "sends random foxgirl",
  timeout: 3000,
  usage: "",
  aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {


        async function work() {
        let owo = (await neko.sfw.foxGirl());

        const foxGirl = new Discord.MessageEmbed()
        .setTitle("Random Fox Girl")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(foxGirl);

}

      work();
}
                };
