const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'mod-nick',
    description: 'Moderate a nickname that is not following the rules',
    timeout: 4000,
    usage: '<@user | user.id>',
    userPerms: ['MANAGE_NICKNAMES'],
    clientPerms: ['MANAGE_NICKNAMES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        let user = message.mentions.members.first();
        if(!user) {
            user = message.guild.members.cache.get(args[0])
        }
        if(!user) return message.channel.send('Please mention a user to moderate them')

        if (message.member.roles.highest.position <= user.roles.highest.permission) return message.channel.send(`${emoji.error} The target has a higher position than you.`);
        if (message.guild.me.roles.highest.position <= user.roles.highest.permission) return message.channel.send(`${emoji.error} The target has a higher position than me.`);

        
        function generateRandomString(length){
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
            var random_string = '';
            if(length > 0){
              for(var i=0; i < length; i++){
                  random_string += chars.charAt(Math.floor(Math.random() * chars.length));
              }   
        }
        return random_string  
        }

        const random = generateRandomString(6)

        nickname = `Moderated nickname ${random}`

        try {
            await user.setNickname(nickname)
            message.channel.send(new MessageEmbed().setDescription(`${emoji.success} Moderated Nickname for **${user.user.tag}** to \`${nickname}\``).setColor("GREEN"))
          } catch(err) {
            message.channel.send('An error occured while trying to moderate the nickname of that user.')
            console.log(err)
          }

          client.modlogs ({
            Member: user,
            Color: 'RED',
            Reason: `Nickname changed to: ${random}`,
            Action: 'Mod Nick'
        }, message)

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}