const emoji = require("../../emoji.json");
module.exports = {
  name: "leave",
  description: "Leaves The Voice Channel",
  timeout: 5000,
  usage: "",
  aliases: ["dc", "disconnect"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["CONNECT"],
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        `${emoji.error} I'm Not In Your Voice Channel`,
      );

    try {
      voiceChannel.leave();
    } catch (error) {
      return message.channel.send(
        `There Was An Error Disconnecting To The Voice Channel: ${error}`,
      );
    }
  },
};
