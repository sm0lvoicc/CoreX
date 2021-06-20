const Schema = require('../../models/ghostping')

module.exports = {
  name: 'disable-ghostping',
  description: "Disable Anti Ghost Ping Module",
  aliases: ['d-gp'],
  timeout: '9000',
  primeOnly: true,
  usage: '',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`You do not have the permission \`MANAGE_SERVER\``)
    if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return message.reply(`I do not have the permission \`MANAGE_SERVER\``)

    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.reply(`**Anti Ghost Ping** Module is disabled already`)
      data.delete()
      message.reply(`**Anti Ghost Ping** Module has been disabled.`)
    })
  }
}