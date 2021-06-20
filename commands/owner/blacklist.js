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

        let User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')
        const blReason = args.slice(1).join(" ");;

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`**${User.displayName}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id, reason : blReason })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`**${User.user.tag}** has been added to blacklist.`)
            }
           
        })
    }
}