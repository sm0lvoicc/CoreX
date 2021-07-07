const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'disallow-alt',
    description: 'Remove a user from the alt whitelist',
    timeout: 5000,
    usage: '<user_id>',
    aliases: ['d-alt'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.channel.send(`${emoji.error} The alt Module is already disabled`)
            
            if(!args[0]) return message.channel.send('Please specify a user ID to remove from the whitelist')
            if(isNaN(args[0])) return message.channel.send('The user ID must be a number')
        
            if(!data.Allowed_Alts.includes(args[0])) return message.channel.send(`${emoji.error} This user has not been whitelisted`)
            let arr = db.allowedAlts
            let newArr = removeA(arr, args[0])

            await data.updateOne({
                Allowed_Alts: newArr
            })
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${emoji.success} Succesfully removed <@${args[0]}> from the whitelist`)
            .setTimestamp()

            message.channel.send(embed)
            
            function removeA(arr) {
                var what, a = arguments, L = a.length, ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax= arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }
        })
    }
}