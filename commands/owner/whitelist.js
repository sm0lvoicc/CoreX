const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'whitelist',
    hidden: true,
    timeout: 1000,
    run : async(client, message, args) => {
        let array = ['538668078012039168', '451202806653648936']
  
        if(!array.includes(message.author.id.toString())) {
          return;
        }
        const userID = args[0]
        if(!userID) return message.channel.send('User is not valid.')
        
        client.users.fetch(userID).then(async(user) => {
            blacklist.findOne({ id : user.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                   await blacklist.findOneAndDelete({ id : user.id })
                    .catch(err => console.log(err))
                    message.channel.send(`<:corexyes:860561725916053514> **${user.tag}** has been removed from blacklist.`)
                } else {
                   message.channel.send(`<:corexerror:860580531825147994> **${user.tag}** is not blacklisted.`)
                }
               
            })
        })
    }
}