const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/anti-ad')

module.exports = {
    name: 'anti-advertising',
    description: 'Enable/Disable Anti-Advertising',
    timeout: 10000,
    usage: '<enable/disable> <Action>',
    aliases: ['anti-ad'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.channel.send("Please enter either **enable** or **disable**")
        const opt = args[0].toLowerCase()
        if (!opt) return message.channel.send('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **enable** or **disable**')

        if(opt == 'enable') {
            const action = args[1]
            if(!action) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle('<:corexwarn:860597628882780200> Please specify an Action.')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            if(!(["warn","mute", "delete" ,"kick","ban"]).includes(action.toLowerCase())) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle('<:corexwarn:860597628882780200> Please specify a correct action')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data) data.delete()
                const newData = new schema({
                    Guild: message.guild.id,
                    Action: action
                })
                newData.save()
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`<:corexyes:860561725916053514> Anti-Ad has been set with Action: **${action}**`))
            })
        }
        if(opt == 'disable') {
            schema.findOne({Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('<:corexerror:860580531825147994> Anti-Ad is already disabled')
                data.delete()
                message.reply('<:corexyes:860561725916053514> Anti-Ad has been disabled')
            })
        }
    }
}