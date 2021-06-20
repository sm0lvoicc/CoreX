const schema = require('../../models/autorole')

module.exports = {
    name: 'enable-autorole',
    description: 'Enable Auto Role Module of a server',
    aliases: ['e-ar'],
    timeout: 7000,
    usage: '<@Role>',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have the permission \`MANAGE_ROLES\`")
        
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.reply(`Please mention a role to set as the autorole`)
        
        if(role.position >= message.guild.me.roles.highest.position) return message.reply('I cannot add a role that is higher/equal to my role')
        
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                message.reply(`The autorole module for this server has already been enabled.`)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                message.channel.send(`Success! Auto Role for this server has been enabled`)
            }
        })
    }
}