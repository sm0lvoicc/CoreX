  
const { MessageEmbed } = require('discord.js')
const emoji = require(`../../emoji.json`)

module.exports = {
  name: 'create-invite',
  aliases: ['create-inv'],
  timeout: '5000',
  description: "Create an invite of the server",
  usage: '',
  userPerms: ['SEND_MESSAGES'],
  clientPerms: ['CREATE_INSTANT_INVITE'],
  run: async(client, message, args) => {
    try {
      const invite = await message.channel.createInvite({
        temporary: false,
        maxAge: 0,
        maxUses: 100,
        reason: `Created by: ${message.author.tag}`,
      })
      await message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.invite} Created Invite`)
        .setDescription(`Invite: https://discord.gg/${invite.code}\n\nTemporary: \`false\`\nExpires: \`No Expiry\`\nMaximum Users: \`100 users\``)
        .setColor("BLUE")
      )

    } catch(e) {
      message.channel.send(`There has been an error, **${e}**`)
    }

  }
}