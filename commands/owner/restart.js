const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart-bot',
    timeout: 1000,
    hidden: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      let array = ['538668078012039168', '451202806653648936']
  
      if(!array.includes(message.author.id.toString())) {
        return;
      }        
      
        const embed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor("RED")
          .setFooter(client.user.username)
          .setTitle(`Shutdown?`)
          .setDescription('✅ Click this to restart me \n ❌ Click this to cancel');
          
          const msg = await message.channel.send(embed);
          
          await msg.react("✅");
          await msg.react("❌");
    
          const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
          collector.on("collect", async(reaction) => {
    
          if(reaction._emoji.name === "❌"){
          return msg.delete();
          }
          
          if(reaction._emoji.name === "✅"){
          message.channel.send("**Restarting...** \n `System will be down after 2 mins`").then(() => {
            process.exit(1);
            })
          }
    
          await reaction.users.remove(message.author.id);
          });
    }
}