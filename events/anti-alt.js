const client = require('../index')
const altSchema = require('../models/alt')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

client.on('guildMemberAdd', async(member) => {
    altSchema.findOne({ Guild: member.guild.id}, async(err, data) => {
        if(!data) return;
        let arr = data.Allowed_Alts;
        if(arr.includes(member.id)) return;
        if(data.Days == '0') return;
        if(data.Avatar == true) {
          if(member.user.avatar == null) {
          await member.send(new MessageEmbed()
            .setTitle(`CoreX Alt Identifier`)
            .setDescription(`You were kicked from **${member.guild.name}** | **This account is suspected of being an alt**`)
            .setColor("RED")
            .setTimestamp()
          )
            await member.kick('This account is suspected of being an alt')
          }
      }

      let x = Date.now() - member.user.createdAt;
      let created = Math.floor(x / 86400000);
        let AltAge = data.Days
        if(created >= AltAge) return;
        if(created < AltAge) {
      await member.send(new MessageEmbed()
          .setTitle(`CoreX Alt identifier`)
          .setDescription(`You were kicked from **${member.guild.name}** | **The Age Of This Account Is Below Age Requirements**`)
          .setColor("RED")
          .setTimestamp()
        )
	      await member.kick(`The Age Of This Account Is Below Age Requirements`)
        }
        
        
      const altChannel = await member.guild.channels.cache.get(data.Channel)
      if(!altChannel || altChannel.available) return;
      const embed = new MessageEmbed()
        .setTitle(`CoreX Alt Identifier`)
        .setDescription(`**:Caution: New Alt Found**`)
        .addField(`General Information`, [
          `Name: ${member.user.username}`,
          `Discriminator: ${member.user.discriminator}`
        ])
        .addField(`Additional Information`, [
          `Bot: ${member.user.bot}`,
          `Created: ${moment(member.user.createdTimestamp).format(
                  "LT"
              )} ${moment(member.user.createdTimestamp).format(
                  "LL"
              )}  ${moment(member.user.createdTimestamp).fromNow()}`,
          `Joined: ${moment(member.joinedTimestamp).format(
                  "LT"
              )} ${moment(member.joinedTimestamp).format(
                  "LL"
              )}  ${moment(member.joinedTimestamp).fromNow()}`,
          `Avatar: ${member.user.avatar || `No Avatar`}`,
        ])
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor("RED")
        .setFooter(`Kicked That Alt`)
      
        altChannel.send(embed)
    })

   
})


client.on('guildDelete', async(guild) => {
altSchema.findOne({ Guild: guild.id}, async(err, data) => {
  if(!data) return;
  if (err) throw err;
    if (data) {
      altSchema.findOneAndDelete({ Guild : guild.id })
    }
})
})