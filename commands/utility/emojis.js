const { MessageEmbed } = require('discord.js');
const emoji = require(`../../emoji.json`)

module.exports = {
    name: "emojis",
    description: "Shows all the emojis available in the server",
    aliases: ["Serveremojis", "emojilist", "serveremojis"],
    usage: '',
    timeout: 2000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['MANAGE_EMOJIS'],
    primeOnly: true,
    run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`${emoji.inbox} Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
      )
      .setColor('RANDOM');

    if (Embed.length > 2000) {
      return message.channel.send(
        `I'm sorry but, my limit is 2000 characters only!`
      );
    } else {
      message.channel.send(Embed);
    }
  },
};
