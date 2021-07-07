const { MessageEmbed } = require("discord.js");
const emoji = require('../emoji.json')

let mainColor = "#fff000"
let failColor = "0xeb3452";
let successColor = "0x34eb86";

module.exports = (type, description, ...otherArgs) => {
  const embed = new MessageEmbed()
    .setColor(
      mainColor)
    .setDescription(
      `${
        type === "success"
          ? emoji.success
          : type === "fail"
          ? emoji.error
          : ""
      } ${description}`
    );
  if (typeof otherArgs !== "undefined") {
    if (typeof otherArgs[0] === "object") {
      let user = otherArgs[0];
      if (user.username) {
        embed.setAuthor(
          user.username,
          user.displayAvatarURL({ dynamic: true })
        );
      }
    }
    if (typeof otherArgs[1] === "string") {
      embed.setFooter(otherArgs[1]);
    }
    return embed;
  }
};