const schema = require('../../models/suggestions')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggest',
    description: 'Suggests something for the server',
    aliases: [''],
    timeout: '10000',
    usage: '<text>',
    run: async(client, message, args) => {

        const suggest = args.join(" ")
        if(!suggest) return message.reply(`Please add some text to suggest`)

        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send('The suggestion module has not been enabled')
            } else{

                const channel = message.guild.channels.cache.get(data.Channel)
                if(!channel) {
                    return message.channel.send('There is no suggestion channel.')
                }
                if(channel) {
                    if(suggest.length > 256) return message.channel.send(`Suggestion Text must be 256 or fewer in length`)
                    const msg = await channel.send(new MessageEmbed()
                        .setTitle(`Suggestion by ${message.author.tag}`)
                        .setDescription(suggest)
                        .setFooter(`A Suggestion Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor("RANDOM")
                    )
                    await msg.react(`✅`)
                    await msg.react(`❌`)
                    message.reply(`Your suggestion has been sent!`)
                }
            }
        })
    }
}