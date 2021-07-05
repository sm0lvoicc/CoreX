const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'spotify',
    description: 'Shows what the mentioned member is playing',
    timeout: 1000,
    usage: '[@member]',
    aliases: ['spoty'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first()
        if(!user) {
          user = message.author
        }
      
        user.presence.activities.forEach((activity) => {
          if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
        
                   let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                   let trackURL = `https://open.spotify.com/track/${activity.syncID}`;
   
                   let trackName = activity.details;
                   let trackAuthor = activity.state;
                   let trackAlbum = activity.assets.largeText;
   
                   trackAuthor = trackAuthor.replace(/;/g, ",")
   
                   const embed = new MessageEmbed()
                     .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                     .setColor("BLURPLE")
                     .setThumbnail(trackIMG)
                     .addField('Song Name', `\`\`\`json\n"${trackName}"\n\`\`\``, true)
                     .addField('Album', `\`\`\`json\n"${trackAlbum}"\n\`\`\``, true)
                     .addField('Author', `\`\`\`json\n"${trackAuthor}"\n\`\`\``, true)
                     .addField('Listen to Track', `${`\`\`\`json\n"${trackURL}"\n\`\`\``}`, false)
                     .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
                  message.channel.send(embed);
               }})
}
}