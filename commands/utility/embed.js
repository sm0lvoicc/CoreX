const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "embed",
  description: "Makes an embed for you.",
  timeout: 6000,
  usage: "answer the messages",
  aliases: ["embed-gen"],
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const filter = (msg) => msg.author.id == message.author.id;
      const options = {
        max: 1,
      };

      const embed = new MessageEmbed();
      message.channel.send(
        "Reply `skip` to skip question, Reply `cancel` to stop the command.",
      );
      message.channel.send("Type title for the embed");
      let title = await message.channel.awaitMessages(filter, options);
      if (title.first().content == "cancel")
        return message.channel.send("Cancelled the command");
      if (
        title.first().content !== "skip" &&
        title.first().content !== "cancel"
      )
        embed.setTitle(title.first().content);

      message.channel.send("Type Description for the embed");
      let Description = await message.channel.awaitMessages(filter, options);
      if (Description.first().content == "cancel")
        return message.channel.send("Cancelled the command");
      if (
        Description.first().content !== "skip" &&
        Description.first().content !== "cancel"
      )
        embed.setDescription(Description.first().content);

      message.channel.send("Type footer for the embed");
      let Footer = await message.channel.awaitMessages(filter, options);
      if (Footer.first().content == "cancel")
        return message.channel.send("Cancelled the command");
      if (
        Footer.first().content !== "skip" &&
        Footer.first().content !== "cancel"
      )
        embed.setFooter(Footer.first().content);

      if (
        title.first().content !== "skip" &&
        title.first().content !== "cancel"
      ) {
        message.channel.send(
          "Provide URL for the embed (Type `skip` if you didn't specify title)",
        );
        let URL = await message.channel.awaitMessages(filter, options);
        if (URL.first().content == "cancel")
          return message.channel.send("Cancelled the command");
        if (URL.first().content !== "skip" && URL.first().content !== "cancel")
          embed.setURL(URL.first().content);
      }

      message.channel.send("Send Hex Color");
      let Color = await message.channel.awaitMessages(filter, options);
      if (Color.first().content == "cancel")
        return message.channel.send("Cancelled the command");
      if (
        Color.first().content !== "skip" &&
        Color.first().content !== "cancel"
      )
        embed.setColor(Color.first().content.toUpperCase() || "ff0000");

      message.channel.send("Type Author Field for the embed");
      let Author = await message.channel.awaitMessages(filter, options);
      if (Author.first().content == "cancel")
        return message.channel.send("Cancelled the command");
      if (
        Author.first().content !== "skip" &&
        Author.first().content !== "cancel"
      )
        embed.setAuthor(Author.first().content);

      message.channel.send(
        "Do you want any Timestamp (Time Now) ? Reply `yes` or `no`",
      );
      let TimeStamp = await message.channel.awaitMessages(filter, options);
      if (TimeStamp.first().content == "cancel")
        return message.channel.send("Embed Generator Cancelled.");
      if (TimeStamp.first().content !== "yes") embed.setTimestamp();

      message.channel.send(
        "Which channel do you want to send the embed ? Mention channel or specify Channel ID",
      );
      let Channel = await message.channel.awaitMessages(filter, options);
      const ch =
        (await Channel.first().mentions.channels.first()) ||
        message.guild.channels.cache.get(Channel.first());
      if (ch) return ch.send(embed);
      message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  },
};
