const schema = require('../../models/autorole')

module.exports = {
    name: 'disable-autorole',
    description: 'Disable Auto Role Module of a server',
    aliases: ['d-ar'],
    timeout: 7000,
    usage: '',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have the permission \`MANAGE_ROLES\`")
        
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`<:corexerror:860580531825147994> The Auto Role module has been disabled already`)
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`<:corexyes:860561725916053514> The Auto Role Module has been disabled`)
            }
        })
    }
}