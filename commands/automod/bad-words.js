const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/bad-word')

module.exports = {
    name: 'bad-words',
    description: '<Add/remove/Display> Bad words that are not allowed',
    timeout: 10000,
    usage: '<add/remove/display> <bad word> || <action> <Action for saying a word>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

      
        options = [
            'add',
            'remove',
            'display',
            'disable',
            'action',
            'role'
        ]

        if (!args.length) return message.reply("Please enter either **add**, **remove** or **display**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **add**, **remove** or **display**')


        if (!options.includes(opt)) return message.reply('Please enter either **add**, **remove** or **display**')

        if(opt == 'add') {
            const word = args[1]
            
            if(!word) return message.reply('Please enter a word to add to the blacklist')
            if((['@everyone', '@here']).includes(word.toLowerCase())) return message.reply('You cannot add a ping to the blacklist')

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(err) throw err
                if(data) {
                    if(data.Words.includes(word)) return message.reply('This word is already added to the blacklist')
                    data.Words.push(word)
                    data.save()
                    message.reply(`Added \`${word}\` to the blacklist`)
                } else {
                    new schema({
                        Guild: message.guild.id,
                        Words: word,
                    }).save()
                    message.reply(`Added \`${word}\` to the blacklist`)
                }
            })
        }

        if(opt == 'remove') {
            const word2 = args.slice(1).join(' ')
            if(!word2) return message.reply('Please enter a word to remove from the blacklist')

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(err) throw err;
                if(!data) return message.reply('There are no blacklisted words')
                if(!data.Words.includes(word)) return message.reply(`\`${word}\` is not a blacklisted word`)
                const filtered = data.Words.filter(target => target !== word);
                
                await schema.findOneAndUpdate({ Guild: message.guild.id}, {
                    Guild: message.guild.id,
                    Words: filtered
                })
                message.reply(`Removed \`${word}\` from the blacklist`)

            })
        }


        if(opt == 'display') {
            schema.findOne({ Guild: message.guild.id}, async(err,data) => {
                if(err) throw err;
                if(!data) return message.channel.send(`There are no words blacklisted`)
                message.channel.send(new MessageEmbed()
                    .setTitle(`Blacklisted Words`)
                    .setDescription( data.Words.join(` `) || `There are no words blacklisted` )
                    .setColor("RANDOM")
                )
              })
        }

        if(opt == 'action') {
            const action = args[1]
            if(!action) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle('Please specify an Action.')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            if(!(["warn","mute", "delete" ,"kick","ban"]).includes(action.toLowerCase())) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle('Please specify a correct action')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                data.Action = action

                if(data) {
                    await schema.findOneAndUpdate({ Guild: message.guild.id}, {
                        Action: action
                    })
                } 

                message.channel.send(`Action for cursing is \`${action}\``)
            })

        }
        if(opt == 'disable') {
            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('The anti-curse module is already disabled')
                data.delete() 
                message.reply('The anti-curse module has been disabled')
            })
        }

    }
}