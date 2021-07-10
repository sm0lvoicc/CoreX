module.exports = {
  name: "say",
  description: "Bot says what you typed.",
  usage: "<text>",
  timeout: 1000 * 3,
  aliases: ["bot-say"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const sayMessage = args.join(" ");

    if (!sayMessage)
      return message.channel.send("Please specify something to say");
    message.delete().catch((O_o) => {});
    message.channel.send(`${sayMessage}\n\nBy: **${message.author.tag}**`);
  },
};
