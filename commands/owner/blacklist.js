const blacklist = require("../../models/blacklist");
const { Message } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "blacklist",
  /**
   * @param {Message} message
   */
  timeout: 1000,
  hidden: true,
  run: async (client, message, args) => {
    if (!require("../../config.json").owners.includes(message.author.id))
      return;

    let userID = args[0];
    if (!userID) return message.channel.send("User is not valid.");
    const blReason = args.slice(1).join(" ");

    if (!blReason) return message.channel.send(`You must supply a reason`);

    client.users.fetch(userID).then(async (user) => {
      blacklist.findOne({ id: user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
          message.channel.send(
            `${emoji.error} **${user.tag}** has already been blacklisted!`,
          );
        } else {
          data = new blacklist({ id: user.id, reason: blReason });
          data.save().catch((err) => console.log(err));
          message.channel.send(
            `${emoji.success} **${user.tag}** has been added to blacklist.`,
          );
        }
      });
    });
  },
};
