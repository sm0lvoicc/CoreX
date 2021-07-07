const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
    name : 'whitelist',
    hidden: true,
    timeout: 1000,
    run : async(client, message, args) => {
        if (
            !require("../../config.json").owners.includes(
              message.author.id
            )
          )
            return;
        const userID = args[0]
        if(!userID) return message.channel.send('User is not valid.')
        
        client.users.fetch(userID).then(async(user) => {
            blacklist.findOne({ id : user.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                   await blacklist.findOneAndDelete({ id : user.id })
                    .catch(err => console.log(err))
                    message.channel.send(`${emoji.success} **${user.tag}** has been removed from blacklist.`)
                } else {
                   message.channel.send(`${emoji.error} **${user.tag}** is not blacklisted.`)
                }
               
            })
        })
    }
}