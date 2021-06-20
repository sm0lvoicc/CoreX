module.exports = {
    name: "sudo",
    description: "Makes a webhook to impersonate someone",
    usage: "<user> <message>",
    timeout: 5000,
    run: async (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.reply(`You do not have the permission \`MANAGE_WEBHOOKS\``)
      message.delete();
      let user =
        message.mentions.members.first();
      if (!user) return message.channel.send("Please mention a user!");
      const webhook = await message.channel.createWebhook(user.displayName, {
        avatar: user.user.displayAvatarURL(),
        channel: message.channel.id
      });
      await webhook.send(args.slice(1).join(" ")).then(() => {
        webhook.delete();
      });
    }
  };