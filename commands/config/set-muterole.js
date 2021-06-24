const schema = require('../../models/mutes')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'set-muterole',
    usage: '<@Role>',
    description: 'Set/Check Mute Role of a server',
    aliases: ['mrole'],
    timeout: '5000',
    run: async(client, message, args) => {
        try {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)

        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(!role) return message.channel.send(new MessageEmbed().setTitle(`Server 's Mute Role`).setDescription(`**Role: <@&${data.Role}>**`).setColor("RANDOM"))
                await data.delete()
                        data2 = new schema({
                            Guild: message.guild.id,
                            Role: role.id
                        })
                    data2.save()
                    message.channel.send(new MessageEmbed().setTitle(`Mute Role Updated`).setDescription(`**Role: ${role}**`).setColor("RANDOM"))
                    } else {
                if(!role) return message.channel.send(new MessageEmbed().setTitle(`Server 's Mute Role`).setDescription(`**Role: Not Set**`).setColor("RANDOM"))
                data = new schema({
                    Guild: message.guild.id,
                    Role: role.id
                })
                message.channel.send(new MessageEmbed().setTitle(`Mute Role Updated`).setDescription(`**Role: ${role}\nAction By: ${message.author.tag}**`).setColor("RANDOM"))
            data.save()
            }
        })
    } catch(e) {
        message.channel.send(`There has been an error, **${e}**`)
    }
    }
}