const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'disallow-alt',
    description: 'Remove a user from the alt whitelist',
    timeout: 5000,
    usage: '<user_id>',
    aliases: ['d-alt'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.reply('<:corexerror:860580531825147994> The alt Module is disabled')
            
            if(!args[0]) return message.reply('Please specify a user ID to remove from the whitelist')
            if(isNaN(args[0])) return message.reply('The user ID must be a number')
            if(!data.Allowed_Alts.includes(args[0])) return message.reply('<:corexerror:860580531825147994> This user has not been whitelisted')
            let arr = db.allowedAlts
            let newArr = removeA(arr, args[0])

            await data.updateOne({
                Allowed_Alts: newArr
            })

            message.channel.send(`<:corexyes:860561725916053514> Succesfully removed <@${args[0]}> from the whitelist`)
            
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