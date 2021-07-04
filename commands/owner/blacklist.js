const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'blacklist-user',
    /**
     * @param {Message} message
     */
    timeout: 1000,
    hidden: true,
    run : async(client, message, args) => {
        let array = ['538668078012039168', '451202806653648936']
  
      if(!array.includes(message.author.id.toString())) {
        return;
      }

        let userID = message.guild.members.cache.get(args[0])
        if(!userID) return message.channel.send('User is not valid.')
        const blReason = args.slice(1).join(" ");

        client.users.fetch(userID).then(async(user) => {
            blacklist.findOne({ id : user.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    message.channel.send(`<:corexerror:860580531825147994> **${user.tag}** has already been blacklisted!`)
                } else {
                    data = new blacklist({ id : user.id, reason : blReason })
                    data.save()
                    .catch(err => console.log(err))
                message.channel.send(`<:corexyes:860561725916053514> **${user.tag}** has been added to blacklist.`)
                }
               
            })
        })
        
       
    }
}