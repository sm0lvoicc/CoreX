const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'whitelist-user',
    hidden: true,
    timeout: 1000,
    run : async(client, message, args) => {
        let array = ['538668078012039168', '451202806653648936']
  
        if(!array.includes(message.author.id.toString())) {
          return;
        }
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send(`**${User.displayName}** has been removed from blacklist.`)
            } else {
               message.channel.send(`**${User.displayName}** is not blacklisted.`)
            }
           
        })
    }
}