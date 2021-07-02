const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/ranks')

module.exports = {
    name: 'addrank',
    description: 'Adds a rank to the server that members can join',
    timeout: 3000,
    usage: '<rank-name> <hex color> ',
    aliases: ['createrank', 'add-rank'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermissions('MANAGE_SERVER')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')
        if(!message.guild.me.hasPermissions('MANAGE_SERVER')) return message.reply('I do not have the permission \`MANAGE_SERVER\`')

        const rankName = args.join(' ')
        const hexColor = args[1]

        if(!rankName) return message.reply('Please set a rank name')

        if(!hexColor) return message.reply('Please set a hex color.')
        if(hexColor > 16777215) return message.reply('This hex color is does not exist')
        if(hexColor < 0) return message.reply('Please set a hext color bigger than 0')

        const rankRole = await message.guild.roles.create({
            data: {
                name: rankName,
                color: hexColor
            }
        })

        await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data){
                message.channel.send('There is already a rank with that name')
            } else {
                if(!data) {
                    newData = new schema({
                        Rank: rankName,
                        Role: rankRole.id
                    })

                    const embed = new MessageEmbed()
                    .setColor(hexColor)
                    .setTitle('Rank created')
                    .setDescription(`A rank with the name ${rankName} has been created`)
                    .setTimestamp()
                    message.channel.send(embed)
                }
            }
        })
    }
}