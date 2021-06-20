const Schema = require('../../models/ghostping')

module.exports = {
  name: 'enable-ghostping',
  description: "Enable Anti Ghost Ping Module",
  aliases: ['e-gp'],
  timeout: '10000',
  usage: '',
  primeOnly: true,
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)
    if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return message.member.send(`I do not have the permission \`MANAGE_SERVER\``)
    
    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) return message.channel.send(`**Anti Ghost Ping** Module is enabled already`)
      new Schema({
        Guild: message.guild.id
      }).save()
      message.channel.send(`**Anti Ghost Ping** Module has been enabled.`)
    })
  }
}