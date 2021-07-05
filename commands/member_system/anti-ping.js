const { MessageEmbed } = require('discord.js')
const schema = require('../../models/anti-ping')

module.exports = {
  name: 'anti-ping',
  description: "Settings of Anti-Ping",
  timeout: 3000,
  aliases: ['anti-ping-set'],
  usage: '[add/remove/display]',
  primeOnly: true,
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`You do not have the permission \`MANAGE_SERVERs\``)
    
    const query = args[0]

    if(!query) return message.channel.send(`You need to provide query. \`add\` to add a member ; \`remove\` to remove member ; \`display\` to display all members`);
    
    if(!(["add","remove","display"]).includes(query.toLowerCase())) return message.channel.send(`You need to provide a correct query. \`add\` to add member ; \`remove\` to remove member ; \`display\` to display all members`);
    
    const guild = { Guild: message.guild.id }

    if(query.toLowerCase() == "add") {

      const word = await message.mentions.members.first() || message.guild.members.cache.get(args[1])

      if(!word) return message.channel.send(`You need to mention member to add`)

      schema.findOne(guild, async(err,data) => {

        if(data) {

          if(data.Member.includes(word.id)) return message.channel.send(`${word.user.tag} is already in the Anti-ping system`)
          data.Member.push(word.id)
          data.save()
          const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`<:corexyes:860561725916053514> **${word.user.tag}** has been added to the Anti-Ping system`)
            message.channel.send(embed)
        
        } else if(!data) {
          
            new schema({
            Guild: message.guild.id,
            Member: word.id
          }).save()

          const embed2 = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`<:corexyes:860561725916053514> **${word.user.tag}** has been added to the Anti-Ping system`)
          message.channel.send(embed2)
        }
      })
    } else if(query.toLowerCase() == 'remove') {
      const word = await message.mentions.members.first() || message.guild.members.cache.get(args[1])

      if(!word) return message.channel.send(`You need to mention member to remove from the Anti-ping system`);

      schema.findOne(guild, async(err,data) => {
        if(!data) return message.channel.send(`<:corexerror:860580531825147994> There is no member in Anti-Ping`)
        if(!data.Member.includes(word.id)) return message.channel.send(`${word.user.tag} isn't in the Anti-Ping system`)
        const filtered = data.Member.filter(c => c !== word.id);
        await schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Member: filtered
        })
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`<:corexyes:860561725916053514> **${word.user.tag}** has been removed from the Anti-Ping system`)
        message.channel.send(embed)
      })
    } else if(query.toLowerCase() == 'display') {
      schema.findOne(guild, async(err, data) => {
        if(!data) return message.channel.send(`<:corexerror:860580531825147994> There is no member in the Anti-Ping system`);
        message.channel.send(new MessageEmbed()
        .setTitle(`<:corexinfo:860565886111580172> Anti-Ping`)
        .setDescription(`<@${data.Member.join("> <@") || `There is no member in Anti-Ping system`}>`))
      })
    }
  }
}