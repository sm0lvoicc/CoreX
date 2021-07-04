const Discord = require('discord.js')

module.exports = {
    name: 'nuke',
    description: 'Nukes a channnel and clones it.',
    timeout: 10000,
    aliases: ['atom'],
    usage: '',
    run: async(client, message, args) => {
      try {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You do not have the permission \`MANAGE_CHANNELS\`');


        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I do not have the permission \`MANAGE_CHANNELS\`')
  
          if (!message.channel.parentID) {
            message.channel.clone({ position: message.channel.rawPosition }).then((ch) => {
              ch.send(new Discord.MessageEmbed()
              .setColor('BLUE')
              .setDescription(`<:corexyes:860561725916053514> Channel nuked by ${message.author}`)
              .setImage('https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif')
              .setTimestamp()
              )
            });
  
          } else {
            message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
              ch.send(new Discord.MessageEmbed()
              .setColor('BLUE')
              .setDescription(`<:corexyes:860561725916053514> Channel nuked by ${message.author}`)
              .setImage('https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif')
              .setTimestamp()
              )
            });
          }
          message.channel.delete()

      } catch(e) {
        message.channel.send(`There has been an error, **${e}**`)
      }
    
    },
};