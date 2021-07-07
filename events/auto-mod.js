const muteSchema = require('../models/mutes')
const spamSchema = require('../models/anti-spam')
const warnSchema = require('../models/warns')
const linkSchema = require('../models/anti-link')
const adSchema = require('../models/anti-ad')
const blacklistWord = require('../models/bad-word')
const whitelist = require('../models/whitelist-channel')
const client = require('../index')
const { MessageEmbed } = require('discord.js')
const usersMap = new Map()

client.on('message', message => {
    if(!message.guild) return;
    if(message.author.bot) return;
    if(message.member.hasPermission('ADMINISTRATOR')) return;
    if(message.member.hasPermission('MANAGE_GUILD')) return;

    //spam

        whitelist.findOne({ Guild: message.guild.id}, async(err, db1) => {
           if(db1) {
               if(db1.Anti_spam.includes(message.channel.id)) return;
   
              await spamSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                   if(!data) return;
                   if(data.Messages <= 2) return data.delete();
                   const reason = 'Spamming'
                   if(usersMap.has(message.author.id)) {
                       const userData = usersMap.get(message.author.id)
                       let msgCount = userData.msgCount;
                       if(parseInt(msgCount) === data.Messages) {
                           if(data.Action == 'ban') {
                               if(message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
                               
                               const dmBan = new MessageEmbed()
                               .setTitle("Banned!")
                               .setDescription(`You have been banned from **${message.guild}**!`)
                               .addField('Member', message.member, true)
                               .addField('Reason', reason)
                               .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                   dynamic: true
                               }))
                               .setTimestamp()
                               .setColor('RED')
           
                               try {
                                   message.member.send(dmBan)
                               } catch(e) {
                                   return;
                               }
           
                               message.guild.members.ban(message.member, {reason: reason})
                               message.channel.send(`**${message.member.user.tag}** has been banned for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                           
                           } else if(data.Action == 'kick') {
                               if(message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
                               
                               const dmKick = new MessageEmbed()
                               .setTitle("Kicked!")
                               .setDescription(`You have been kicked from **${message.guild}**!`)
                               .addField('Member', message.member, true)
                               .addField('Reason', reason)
                               .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                   dynamic: true
                               }))
                               .setTimestamp()
                               .setColor('RED')
                               try {
                                   message.member.send(dmKick)
                               } catch(e) {
                                   return;
                               }
           
                               message.member.kick(reason)
                               message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                           
                           }else if(data.Action == 'mute') {
                               await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                                   if(err) throw err
                                   if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                                   const role = await message.guild.roles.cache.get(data2.Role)
                                   if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                                   if(message.member.roles.cache.get(role.id)) return;
                                   await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${reason}`)
                                   await message.channel.send(`**${message.member}** No spamming`).then(msg => msg.delete({ timeout: 6000}))
                                   
                                   const dmMute = new MessageEmbed()
                                   .setTitle("Muted!")
                                   .setDescription(`You have been Muted in **${message.guild}**!`)
                                   .addField('Member', message.member, true)
                                   .addField('Moderator', 'CoreX Auto-Mod')
                                   .addField('Reason', reason)
                                   .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                       dynamic: true
                                   }))
                                   .setTimestamp()
                                   .setColor('RED')
                                   try {
                                       message.member.send(dmMute)
                                   } catch(e) {
                                       return;
                                   }
                                   
                               })
                           } else if(data.Action == 'warn') {
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
                               const random = generateRandomString(10)
                               await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id }, async(err, data3) => {
                                   if(err) throw err;
                                   if(!data3) {
                                       data2  = new warnSchema({
                                           guildId: message.guild.id,
                                           User : message.member.user.id,
                       
                                           content : [
                                               {
                                                   moderator : client.user.id,
                                                   reason : reason,
                                                   ID: random,
                                               }
                                           ]
                                       })
                                   } else {
                                       const obj = {
                                           moderator: client.user.id,
                                           reason: reason,
                                           ID: random
                                       }
                                       data2.content.push(obj)
                                   }
                                   data2.save()
                               });
                               message.channel.send(`**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                               const dmWarn = new MessageEmbed()
                               .setTitle("Warned!")
                                   .setDescription(`You have been Warned in **${message.guild}**!`)
                                   .addField('Member', message.member, true)
                                   .addField('Moderator', 'CoreX Auto-Mod')
                                   .addField('Reason', reason)
                                   .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                       dynamic: true
                                   }))
                                   .setTimestamp()
                                   .setColor('RED')
                                   try {
                                       message.member.send(dmWarn)
                                   } catch(e) {
                                       return;
                                   }
                           }
                       } else {
                           msgCount++
                           userData.msgCount = msgCount;
                           usersMap.set(message.author.id, userData)
                         }
                   }else {
                       usersMap.set(message.author.id, {
                         msgCount: 1,
                         lastMessage: message,
                         timer: null
                       })
                       setTimeout(() => {
                         usersMap.delete(message.author.id);
                       }, 5000)
                     }
               })
           } else {
               spamSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                   if(!data) return;
                   if(data.Messages <= 2) return data.delete();
                   const reason = 'Spamming'
                   if(usersMap.has(message.author.id)) {
                       const userData = usersMap.get(message.author.id)
                       let msgCount = userData.msgCount;
                       if(parseInt(msgCount) === data.Messages) {
                           if(data.Action == 'ban') {
                               if(message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
                               
                               const dmBan = new MessageEmbed()
                               .setTitle("Banned!")
                               .setDescription(`You have been banned from **${message.guild}**!`)
                               .addField('Member', message.member, true)
                               .addField('Reason', reason)
                               .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                   dynamic: true
                               }))
                               .setTimestamp()
                               .setColor('RED')
           
                               try {
                                   message.member.send(dmBan)
                               } catch(e) {
                                   return;
                               }
           
                               message.guild.members.ban(message.member, {reason: reason})
                               message.channel.send(`**${message.member.user.tag}** has been banned for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                           
                           } else if(data.Action == 'kick') {
                               if(message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
                               
                               const dmKick = new MessageEmbed()
                               .setTitle("Kicked!")
                               .setDescription(`You have been kicked from **${message.guild}**!`)
                               .addField('Member', message.member, true)
                               .addField('Reason', reason)
                               .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                   dynamic: true
                               }))
                               .setTimestamp()
                               .setColor('RED')
                               try {
                                   message.member.send(dmKick)
                               } catch(e) {
                                   return;
                               }
           
                               message.member.kick(reason)
                               message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                           
                           }else if(data.Action == 'mute') {
                               await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                                   if(err) throw err
                                   if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                                   const role = await message.guild.roles.cache.get(data2.Role)
                                   if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                                   if(message.member.roles.cache.get(role.id)) return;
                                   await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${reason}`)
                                   await message.channel.send(`**${message.member}** No spamming`).then(msg => msg.delete({ timeout: 6000}))
                                   
                                   const dmMute = new MessageEmbed()
                                   .setTitle("Muted!")
                                   .setDescription(`You have been Muted in **${message.guild}**!`)
                                   .addField('Member', message.member, true)
                                   .addField('Moderator', 'CoreX Auto-Mod')
                                   .addField('Reason', reason)
                                   .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                       dynamic: true
                                   }))
                                   .setTimestamp()
                                   .setColor('RED')
                                   try {
                                       message.member.send(dmMute)
                                   } catch(e) {
                                       return;
                                   }
                                   
                               })
                           } else if(data.Action == 'warn') {
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
                               const random = generateRandomString(10)
                               await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id }, async(err, data3) => {
                                   if(err) throw err;
                                   if(!data3) {
                                       dataWarn = new warnSchema({
                                           guildId: message.guild.id,
                                           User : message.member.user.id,
                       
                                           content : [
                                               {
                                                   moderator : client.user.id,
                                                   reason : reason,
                                                   ID: random,
                                               }
                                           ]
                                       })
                                   } else {
                                       const obj = {
                                           moderator: client.user.id,
                                           reason: reason,
                                           ID: random
                                       }
                                       dataWarn.content.push(obj)
                                   }
                                   dataWarn.save()
                               });
                               message.channel.send(`**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                               const dmWarn = new MessageEmbed()
                               .setTitle("Warned!")
                                   .setDescription(`You have been Warned in **${message.guild}**!`)
                                   .addField('Member', message.member, true)
                                   .addField('Moderator', 'CoreX Auto-Mod')
                                   .addField('Reason', reason)
                                   .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                       dynamic: true
                                   }))
                                   .setTimestamp()
                                   .setColor('RED')
                                   try {
                                       message.member.send(dmWarn)
                                   } catch(e) {
                                       return;
                                   }
                           }
                       } else {
                           msgCount++
                           userData.msgCount = msgCount;
                           usersMap.set(message.author.id, userData)
                         }
                   }else {
                       usersMap.set(message.author.id, {
                         msgCount: 1,
                         lastMessage: message,
                         timer: null
                       })
                       setTimeout(() => {
                         usersMap.delete(message.author.id);
                       }, 5000)
                     }
               })
           }
       })

       //Anti-link

       const validURL = str => {
		var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
		if (!regex.test(str)) {
			return false;
		} else {
			return true;
		}
	};
    
       whitelist.findOne({ Guild: message.guild.id}, async(err, db2) => {
           if(db2) {
            if(db2.Anti_link.includes(message.channel.id)) return;

            if(validURL(message.content)) {
                await linkSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return;
                    const linkReason = 'Posting links'
                    if(data.Action == 'ban') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
        
                        const dmLinkBan = new MessageEmbed()
                        .setTitle("Banned!")
                        .setDescription(`You have been banned from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', linkReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmLinkBan)
                        } catch(e) {
                            return;
                        }
                        message.guild.members.ban(message.member, {reason: linkReason})
                        message.channel.send(`**${message.member.user.tag}** has been banned for: \`${linkReason}\``).then(msg => msg.delete({ timeout: 6000}))
        
                    } else if(data.Action == 'kick') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
        
                        const dmLinkKick = new MessageEmbed()
                        .setTitle("Kicked!")
                        .setDescription(`You have been kicked from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', linkReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmLinkKick)
                        } catch(e) {
                            return;
                        }
                        message.member.kick(linkReason)
                        message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${linkReason}\``).then(msg => msg.delete({ timeout: 6000}))
                    } else if(data.Action == 'delete') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await message.delete()
                        await await message.channel.send(`${message.member} No links allowed`).then(msg => msg.delete({ timeout: 6000 }))
                    } else if(data.Action == 'mute') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                            if(err) throw err;
                            if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                            const role = await message.guild.roles.cache.get(data2.Role)
                            if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                            if(message.member.roles.cache.get(role.id)) return;
                            await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${linkReason}`)
                            await message.channel.send(`**${message.member}** No links allowed`).then(msg => msg.delete({ timeout: 6000}))
                            
                            const dmLinkMute = new MessageEmbed()
                            .setTitle("Muted!")
                            .setDescription(`You have been Muted in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', linkReason)
                            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setColor('RED')
                            try {
                                message.member.send(dmLinkMute)
                            } catch(e) {
                                return;
                            }
                            
                        })
                    } else if(data.Action == 'warn') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
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
                        const random = generateRandomString(10)
                        await message.delete()
                        await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                            if(err) throw err;
                            if(!data3) {
                                dataWarn = new warnSchema({
                                    guildId: message.guild.id,
                                    User : message.member.user.id,
                
                                    content : [
                                        {
                                            moderator : client.user.id,
                                            reason : reason,
                                            ID: random,
                                        }
                                    ]
                                })
                            } else {
                                const obj = {
                                    moderator: client.user.id,
                                    reason: reason,
                                    ID: random
                                }
                                dataWarn.content.push(obj)
                            }
                            dataWarn.save()
        
                            message.channel.send(`**${message.member}** has been warned for: \`${linkReason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                            const dmLinkWarn = new MessageEmbed()
                            .setTitle("Warned!")
                            .setDescription(`You have been Warned in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', linkReason)
                                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setTimestamp()
                                .setColor('RED')
                                try {
                                    message.member.send(dmLinkWarn)
                                } catch(e) {
                                    return;
                                }
                        })
                    }
                })
            }
           } else {
            if(validURL(message.content)) {
                await linkSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return;
                    const linkReason = 'Posting links'
                    if(data.Action == 'ban') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
        
                        const dmLinkBan = new MessageEmbed()
                        .setTitle("Banned!")
                        .setDescription(`You have been banned from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', linkReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmLinkBan)
                        } catch(e) {
                            return;
                        }
                        message.guild.members.ban(message.member, {reason: linkReason})
                        message.channel.send(`**${message.member.user.tag}** has been banned for: \`${linkReason}\``).then(msg => msg.delete({ timeout: 6000}))
        
                    } else if(data.Action == 'kick') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
        
                        const dmLinkKick = new MessageEmbed()
                        .setTitle("Kicked!")
                        .setDescription(`You have been kicked from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', linkReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmLinkKick)
                        } catch(e) {
                            return;
                        }
                        message.member.kick(linkReason)
                        message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${linkReason}\``).then(msg => msg.delete({ timeout: 6000}))
                    } else if(data.Action == 'delete') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await message.delete()
                        await (await message.channel.send(`${message.member} No links allowed`)).attachments(msg => msg.delete({ timeout: 6000 }))
                    } else if(data.Action == 'mute') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                            if(err) throw err;
                            if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                            const role = await message.guild.roles.cache.get(data2.Role)
                            if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                            if(message.member.roles.cache.get(role.id)) return;
                            await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${linkReason}`)
                            await message.channel.send(`**${message.member}** No links allowed`).then(msg => msg.delete({ timeout: 6000}))
                            
                            const dmLinkMute = new MessageEmbed()
                            .setTitle("Muted!")
                            .setDescription(`You have been Muted in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', linkReason)
                            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setColor('RED')
                            try {
                                message.member.send(dmLinkMute)
                            } catch(e) {
                                return;
                            }
                            
                        })
                    } else if(data.Action == 'warn') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
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
                        const random = generateRandomString(10)
                        await message.delete()
                        await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                            if(err) throw err;
                            if(!data3) {
                                dataWarn = new warnSchema({
                                    guildId: message.guild.id,
                                    User : message.member.user.id,
                
                                    content : [
                                        {
                                            moderator : client.user.id,
                                            reason : reason,
                                            ID: random,
                                        }
                                    ]
                                })
                            } else {
                                const obj = {
                                    moderator: client.user.id,
                                    reason: reason,
                                    ID: random
                                }
                                dataWarn.content.push(obj)
                            }
                            dataWarn.save()
        
                            message.channel.send(`**${message.member}** has been warned for: \`${linkReason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                            const dmLinkWarn = new MessageEmbed()
                            .setTitle("Warned!")
                            .setDescription(`You have been Warned in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', linkReason)
                                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setTimestamp()
                                .setColor('RED')
                                try {
                                    message.member.send(dmLinkWarn)
                                } catch(e) {
                                    return;
                                }
                        })
                    }
                })
            }
        }
    })

    //Anti-Ad

    const adURL = str => {
		var regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/;
		if (!regex.test(str)) {
			return false;
		} else {
			return true;
		}
	};

    whitelist.findOne({ Guild: message.guild.id}, async(err, db3) => {
        if(db3) {
            if(db3.Anti_Invite.includes(message.channel.id)) return;

            if(adURL(message.content)) {
                await adSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return;
                    const AdReason = 'Posting Invite links'
                    if(data.Action == 'ban') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
        
                        const dmAdBan = new MessageEmbed()
                        .setTitle("Banned!")
                        .setDescription(`You have been banned from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', AdReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmAdBan)
                        } catch(e) {
                            return;
                        }
                        message.guild.members.ban(message.member, {reason: AdReason})
                        message.channel.send(`**${message.member.user.tag}** has been banned for: \`${AdReason}\``).then(msg => msg.delete({ timeout: 6000}))
        
                    } else if(data.Action == 'kick') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
        
                        const dmAdKick = new MessageEmbed()
                        .setTitle("Kicked!")
                        .setDescription(`You have been kicked from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', AdReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmAdKick)
                        } catch(e) {
                            return;
                        }
                        message.member.kick(AdReason)
                        message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${AdReason}\``).then(msg => msg.delete({ timeout: 6000}))
                    } else if(data.Action == 'delete') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await message.delete()
                        await (await message.channel.send(`${message.member} No Invite links allowed`)).attachments(msg => msg.delete({ timeout: 6000 }))
                    } else if(data.Action == 'mute') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                            if(err) throw err;
                            if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                            const role = await message.guild.roles.cache.get(data2.Role)
                            if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                            if(message.member.roles.cache.get(role.id)) return;
                            await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${linkReason}`)
                            await message.channel.send(`**${message.member}** No Invite links allowed`).then(msg => msg.delete({ timeout: 6000}))
                            
                            const dmAdMute = new MessageEmbed()
                            .setTitle("Muted!")
                            .setDescription(`You have been Muted in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', AdReason)
                            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setColor('RED')
                            try {
                                message.member.send(dmAdMute)
                            } catch(e) {
                                return;
                            }
                            
                        })
                    } else if(data.Action == 'warn') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
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
                        const random = generateRandomString(10)
                        await message.delete()
                        await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                            if(err) throw err;
                            if(!data3) {
                                dataWarn = new warnSchema({
                                    guildId: message.guild.id,
                                    User : message.member.user.id,
                
                                    content : [
                                        {
                                            moderator : client.user.id,
                                            reason : AdReason,
                                            ID: random,
                                        }
                                    ]
                                })
                            } else {
                                const obj = {
                                    moderator: client.user.id,
                                    reason: AdReason,
                                    ID: random
                                }
                                dataWarn.content.push(obj)
                            }
                            dataWarn.save()
        
                            message.channel.send(`**${message.member}** has been warned for: \`${AdReason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                            const dmAdWarn = new MessageEmbed()
                            .setTitle("Warned!")
                            .setDescription(`You have been Warned in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', AdReason)
                                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setTimestamp()
                                .setColor('RED')
                                try {
                                    message.member.send(dmAdWarn)
                                } catch(e) {
                                    return;
                                }
                        })
                    }
                })
            }
        } else {
            if(adURL(message.content)) {
                await adSchema.findOne({ Guild: message.guild.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return;
                    const AdReason = 'Posting Invite links'
                    if(data.Action == 'ban') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)
        
                        const dmAdBan = new MessageEmbed()
                        .setTitle("Banned!")
                        .setDescription(`You have been banned from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', AdReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmAdBan)
                        } catch(e) {
                            return;
                        }
                        message.guild.members.ban(message.member, {reason: AdReason})
                        message.channel.send(`**${message.member.user.tag}** has been banned for: \`${AdReason}\``).then(msg => msg.delete({ timeout: 6000}))
        
                    } else if(data.Action == 'kick') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)
        
                        const dmAdKick = new MessageEmbed()
                        .setTitle("Kicked!")
                        .setDescription(`You have been kicked from **${message.guild}**!`)
                        .addField('Member', message.member, true)
                        .addField('Moderator', 'CoreX Auto-Mod')
                        .addField('Reason', AdReason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
        
                        try {
                            message.member.send(dmAdKick)
                        } catch(e) {
                            return;
                        }
                        message.member.kick(AdReason)
                        message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${AdReason}\``).then(msg => msg.delete({ timeout: 6000}))
                    } else if(data.Action == 'delete') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await message.delete()
                        await message.channel.send(`${message.member} No Invite links allowed`).then(msg => msg.delete({ timeout: 6000 }))
                    } else if(data.Action == 'mute') {
                        await message.delete()
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
                        await muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                            if(err) throw err;
                            if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                            const role = await message.guild.roles.cache.get(data2.Role)
                            if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                            if(message.member.roles.cache.get(role.id)) return;
                            await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${AdReason}`)
                            await message.channel.send(`**${message.member}** No Invite links allowed`).then(msg => msg.delete({ timeout: 6000}))
                            
                            const dmAdMute = new MessageEmbed()
                            .setTitle("Muted!")
                            .setDescription(`You have been Muted in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', AdReason)
                            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setColor('RED')
                            try {
                                message.member.send(dmAdMute)
                            } catch(e) {
                                return;
                            }
                            
                        })
                    } else if(data.Action == 'warn') {
                        if(message.member.hasPermission('ADMINISTRATOR')) return;
                        if(message.member.hasPermission('MANAGE_GUILD')) return;
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
                        const random = generateRandomString(10)
                        await message.delete()
                        await warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                            if(err) throw err;
                            if(!data3) {
                                dataWarn = new warnSchema({
                                    guildId: message.guild.id,
                                    User : message.member.user.id,
                
                                    content : [
                                        {
                                            moderator : client.user.id,
                                            reason : AdReason,
                                            ID: random,
                                        }
                                    ]
                                })
                            } else {
                                const obj = {
                                    moderator: client.user.id,
                                    reason: AdReason,
                                    ID: random
                                }
                                dataWarn.content.push(obj)
                            }
                            dataWarn.save()
        
                            message.channel.send(`**${message.member}** has been warned for: \`${AdReason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                            const dmAdWarn = new MessageEmbed()
                            .setTitle("Warned!")
                            .setDescription(`You have been Warned in **${message.guild}**!`)
                            .addField('Member', message.member, true)
                            .addField('Moderator', 'CoreX Auto-Mod')
                            .addField('Reason', AdReason)
                                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setTimestamp()
                                .setColor('RED')
                                try {
                                    message.member.send(dmAdWarn)
                                } catch(e) {
                                    return;
                                }
                        })
                    }
                })
            }
        }
    })

    //Anti-curse
    whitelist.findOne({ Guild: message.guild.id}, async(err, db4) => {
        if(db4) {
            if(db4.Anti_curse.includes(message.channel.id)) return;

            const spilittedMsg = message.content.split("")
    const reason = "Cursing"
    let deleting = false;
        blacklistWord.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return;
      data.Words.forEach(c => {
        if(message.content.toLowerCase().includes(c)) {
            if(data.Action == 'ban') {
                if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)

                const dmWordBan = new MessageEmbed()
                .setTitle("Banned!")
                .setDescription(`You have been banned from **${message.guild}**!`)
                .addField('Member', message.member, true)
                .addField('Moderator', 'CoreX Auto-Mod')
                .addField('Reason', reaspn)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setColor('RED')

                try {
                    message.member.send(dmWordBan)
                } catch(e) {
                    return;
                }
                message.guild.members.ban(message.member, {reason: reason})
                message.channel.send(`**${message.member.user.tag}** has been banned for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))

            } else if(data.Action == 'kick') {
                 message.delete()
                if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)

                const dmWordKick = new MessageEmbed()
                .setTitle("Kicked!")
                .setDescription(`You have been kicked from **${message.guild}**!`)
                .addField('Member', message.member, true)
                .addField('Moderator', 'CoreX Auto-Mod')
                .addField('Reason', reason)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setColor('RED')

                try {
                    message.member.send(dmWordKick)
                } catch(e) {
                    return;
                }
                message.member.kick(reason)
                message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                
            }else if(data.Action == 'delete') {
                message.channel.send(`**${message.member.user.tag}** no bad words are allowed`).then(msg => msg.delete({ timeout: 6000}))
                message.delete()
                message.channel.send(`${message.member} No Bad words allowed`).then(msg => msg.delete({ timeout: 6000}))              
            }else if(data.Action == 'mute') {
                message.delete()
                muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                    if(err) throw err;
                    if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                    const role = await message.guild.roles.cache.get(data2.Role)
                    if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                    if(message.member.roles.cache.get(role.id)) return;
                    await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${reason}`)
                    message.channel.send(`${message.member} No Bad words allowed`).then(msg => msg.delete({ timeout: 6000}))    

                    const dmWordMute = new MessageEmbed()
                    .setTitle("Muted!")
                    .setDescription(`You have been Muted in **${message.guild}**!`)
                    .addField('Member', message.member, true)
                    .addField('Moderator', 'CoreX Auto-Mod')
                    .addField('Reason', reason)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setColor('RED')
                    try {
                        message.member.send(dmWordMute)
                    } catch(e) {
                        return;
                    }
                    
                })
            } else if(data.Action == 'warn') {
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
                const random = generateRandomString(10)
                message.delete()
                 warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                    if(err) throw err;
                    if(!data3) {
                        dataWarn = new warnSchema({
                            guildId: message.guild.id,
                            User : message.member.user.id,
        
                            content : [
                                {
                                    moderator : client.user.id,
                                    reason : reason,
                                    ID: random,
                                }
                            ]
                        })
                    } else {
                        const obj = {
                            moderator: client.user.id,
                            reason: reason,
                            ID: random
                        }
                        dataWarn.content.push(obj)
                    }
                    dataWarn.save()

                    message.channel.send(`**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                    const dmWordWarn = new MessageEmbed()
                    .setTitle("Warned!")
                    .setDescription(`You have been Warned in **${message.guild}**!`)
                    .addField('Member', message.member, true)
                    .addField('Moderator', 'CoreX Auto-Mod')
                    .addField('Reason', reason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
                        try {
                            message.member.send(dmWordWarn)
                        } catch(e) {
                            return;
                        }
                })
            }
           
        }
      })
    })
        } else {
            const spilittedMsg = message.content.split("")
        const reason = "Cursing"
        let deleting = false;
        blacklistWord.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return;
      data.Words.forEach(c => {
        if(message.content.toLowerCase().includes(c)) {
            if(data.Action == 'ban') {
                if(!message.member.bannable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't ban ${message.member}**`)

                const dmWordBan = new MessageEmbed()
                .setTitle("Banned!")
                .setDescription(`You have been banned from **${message.guild}**!`)
                .addField('Member', message.member, true)
                .addField('Moderator', 'CoreX Auto-Mod')
                .addField('Reason', reaspn)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setColor('RED')

                try {
                    message.member.send(dmWordBan)
                } catch(e) {
                    return;
                }
                message.guild.members.ban(message.member, {reason: reason})
                message.channel.send(`**${message.member.user.tag}** has been banned for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))

            } else if(data.Action == 'kick') {
                 message.delete()
                if(!message.member.kickable) return message.channel.send(`**[CoreX Auto-Mod] I couldn't kick ${message.member}**`)

                const dmWordKick = new MessageEmbed()
                .setTitle("Kicked!")
                .setDescription(`You have been kicked from **${message.guild}**!`)
                .addField('Member', message.member, true)
                .addField('Moderator', 'CoreX Auto-Mod')
                .addField('Reason', reason)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setColor('RED')

                try {
                    message.member.send(dmWordKick)
                } catch(e) {
                    return;
                }
                message.member.kick(reason)
                message.channel.send(`**${message.member.user.tag}** has been kicked for: \`${reason}\``).then(msg => msg.delete({ timeout: 6000}))
                
            }else if(data.Action == 'delete') {
                message.delete()
                message.channel.send(`**${message.member.user.tag} no bad words are allowed`).then(msg => msg.delete({ timeout: 6000}))
            }else if(data.Action == 'mute') {
                message.delete()
                muteSchema.findOne({ Guild: message.guild.id}, async(err, data2) => {
                    if(err) throw err;
                    if(!data2) return message.channel.send('**[CoreX Auto-Mod] The muted role has not been set**')
                    const role = await message.guild.roles.cache.get(data2.Role)
                    if(!role) return message.channel.send(`**[CoreX Auto-Mod] The muted role has been deleted**`)
                    if(message.member.roles.cache.get(role.id)) return;
                    await message.member.roles.add(role.id, `[CoreX Auto-Mod] -  ${reason}`)
                    message.channel.send(`${message.member} No Bad words allowed`).then(msg => msg.delete({ timeout: 6000}))    

                    const dmWordMute = new MessageEmbed()
                    .setTitle("Muted!")
                    .setDescription(`You have been Muted in **${message.guild}**!`)
                    .addField('Member', message.member, true)
                    .addField('Moderator', 'CoreX Auto-Mod')
                    .addField('Reason', reason)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setColor('RED')
                    try {
                        message.member.send(dmWordMute)
                    } catch(e) {
                        return;
                    }
                    
                })
            } else if(data.Action == 'warn') {
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
                const random = generateRandomString(10)
                message.delete()
                 warnSchema.findOne({ guildId: message.guild.id, User: message.member.user.id}, async(err, data3) => {
                    if(err) throw err;
                    if(!data3) {
                        dataWarn = new warnSchema({
                            guildId: message.guild.id,
                            User : message.member.user.id,
        
                            content : [
                                {
                                    moderator : client.user.id,
                                    reason : reason,
                                    ID: random,
                                }
                            ]
                        })
                    } else {
                        const obj = {
                            moderator: client.user.id,
                            reason: reason,
                            ID: random
                        }
                        dataWarn.content.push(obj)
                    }
                    dataWarn.save()

                    message.channel.send(`**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``).then(msg => msg.delete({ timeout: 6000}))
                    const dmWordWarn = new MessageEmbed()
                    .setTitle("Warned!")
                    .setDescription(`You have been Warned in **${message.guild}**!`)
                    .addField('Member', message.member, true)
                    .addField('Moderator', 'CoreX Auto-Mod')
                    .addField('Reason', reason)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                        .setColor('RED')
                        try {
                            message.member.send(dmWordWarn)
                        } catch(e) {
                            return;
                        }
                })
            }
           
        }
      })
    })
        }
    })
})