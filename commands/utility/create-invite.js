  
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'create-invite',
  aliases: ['create-inv'],
  timeout: '5000',
  description: "Create an invite of the server",
  usage: '',
  run: async(client, message, args) => {
    try {
      if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(`I do not have the permission \`CREATE_INSTANT_INVITE\``)
      const invite = await message.channel.createInvite({
        temporary: false,
        maxAge: 0,
        maxUses: 100,
        reason: `Created by: ${message.author.tag}`,
      })
      await message.channel.send(new MessageEmbed()
        .setTitle(`Created Invite`)
        .setDescription(`Invite: https://discord.gg/${invite.code}\n\nTemporary: \`false\`\nExpires: \`No Expiry\`\nMaximum Users: \`100 users\``)
        .setColor("BLUE")
      )

    } catch(e) {
      message.channel.send(`There has been an error, **${e}**`)
    }

  }
}