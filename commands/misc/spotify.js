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
        if(!user) return message.channel.send('Please mention a user.')
      
      let status;
      if (user.presence.activities.length === 1) status = user.presence.activities[0];
      else if (user.presence.activities.length > 1) status = user.presence.activities[1];
      
      if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
        return message.channel.send("This user is not listening music");
      }
      
      if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText;
      
      const card = new MessageEmbed()
          .setTitle(name)
          .setDescription(`**Album: ${album}\nAuthor: ${artist}\nStart: ${status.timestamps.start}\nEnd: ${status.timestamps.end}**`)
          .setColor("BLURPLE")
          .setThumbnail(image)
      await message.channel.send(card)
    }
}
}