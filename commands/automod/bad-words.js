const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/bad-word')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'bad-words',
    description: '<add/remove/display> Bad words that are not allowed',
    timeout: 10000,
    usage: '<add/remove/display> <bad word> || <action> <Action for saying a word>',
    aliases: ['anti-curse'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        options = [
            'add',
            'remove',
            'display',
            'disable',
            'action',
        ]

        if (!args.length) return message.channel.send("Please enter either **add**, **remove** or **display**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **add**, **remove** or **display**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **add**, **remove** or **display**')

        if(opt == 'add') {
            const word = args[1]
            
            if(!word) return message.channel.send(`${emoji.error} Please enter a word to add to the blacklist`)
            if((['@everyone', '@here']).includes(word.toLowerCase())) return message.channel.send(`${emoji.error} You cannot add a ping to the blacklist`)

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(err) throw err
                if(data) {
                    if(data.Words.includes(word)) return message.channel.send(`${emoji.error} This word is already added to the blacklist`)
                    data.Words.push(word)
                    data.save()
                    message.channel.send(`${emoji.error} Added \`${word}\` to the blacklist`)
                } else {
                    new schema({
                        Guild: message.guild.id,
                        Words: word,
                    }).save()
                    message.channel.send(`${emoji.error} Added \`${word}\` to the blacklist`)
                }
            })
        }

        if(opt == 'remove') {
            const word2 = args.slice(1).join(' ')
            if(!word2) return message.channel.send(`${emoji.error} Please enter a word to remove from the blacklist`)

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(err) throw err;
                if(!data) return message.channel.send(`${emoji.error} There are no blacklisted words`)
                if(!data.Words.includes(word2)) return message.channel.send(`${emoji.error} \`${word}\` is not a blacklisted word`)
                const filtered = data.Words.filter(target => target !== word2);
                
                await schema.findOneAndUpdate({ Guild: message.guild.id}, {
                    Guild: message.guild.id,
                    Words: filtered
                })
                message.channel.send(`${emoji.success} Removed \`${word2}\` from the blacklist`)

            })
        }


        if(opt == 'display') {
            schema.findOne({ Guild: message.guild.id}, async(err,data) => {
                if(err) throw err;
                if(!data) return message.channel.send(`${emoji.error} There are no words blacklisted`)
                message.channel.send(new MessageEmbed()
                    .setTitle(`${emoji.info} Blacklisted Words`)
                    .setDescription( data.Words.join(` `) || `There are no words blacklisted` )
                    .setColor("RANDOM")
                )
              })
        }

        if(opt == 'action') {
            const action = args[1]
            if(!action) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle(`${emoji.error} Please specify an Action.`)
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            if(!(["warn","mute", "delete" ,"kick","ban"]).includes(action.toLowerCase())) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle(`${emoji.error} Please specify a correct action`)
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                data.Action = action

                if(data) {
                    await schema.findOneAndUpdate({ Guild: message.guild.id}, {
                        Action: action
                    })
                } 

                message.channel.send( new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${emoji.success} Action for cursing is \`${action}\``)
                )
            })

        }
        if(opt == 'disable') {
            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.channel.send(`${emoji.error} The anti-curse module is already disabled`)
                data.delete() 
                message.channel.send(`${emoji.success} The anti-curse module has been disabled`)
            })
        }

    }
}