const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leave-guild',
    hidden: true,
    timeout: 1000,
    run: async(client, message, args) => {
      let array = ['538668078012039168', '451202806653648936']
  
      if(!array.includes(message.author.id.toString())) {
        return;
      }        
      
      const guildId = args[0];
        if (!guildId) return message.channel.send('Please provide a valid server ID');
        const guild = message.client.guilds.cache.get(guildId);
        if (!guild) return message.channel.send('Unable to find server, please check the provided ID');
        await guild.leave();
        const embed = new MessageEmbed()
          .setTitle('Leave Guild')
          .setDescription(`I have successfully left **${guild.name}**.`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
}