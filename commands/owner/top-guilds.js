const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name : 'top-guilds',
    hidden: true,
    timeout: 1000,
    run : async(client, message, args) => {
        if (
            !require("../../config.json").owners.includes(
              message.author.id
            )
          )
            return;


            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(15);
    
            const description = guilds.map((guild, index) => {
               return `${index+1}) ${guild.name}: ${guild.memberCount} members`
            }).join('\n')
    
            message.channel.send(
                new MessageEmbed()
                .setTitle(`${client.user.username}'s top Guilds`)
                .setThumbnail("https://cdn.discordapp.com/avatars/790269534141284454/b15a9f7480d7a59380e82f3467fe84fa.webp?size=4096")
                .setColor("RANDOM")
                .setDescription(description)
            )
    }
}