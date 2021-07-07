const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'lockdown',
    description: 'Locks down all the channels in your server.',
    timeout: 20000,
    usage: '<on/off>',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_CHANNELS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
         try {    
            if(!args[0]) return message.channel.send(`You need to provide query. \`on\` to enable lockdown, \`off\` to disable lockdown`)
            
            if(!(['on','off']).includes(args[0])) return message.channel.send(`You need to provide a correct query. \`on\` to enable lockdown, \`off\` to disable lockdown`)
            const roleD = message.guild.roles.cache.find(role => role.name == '@everyone')
            
            if(args[0] == 'on') {
            const roleC = message.member.roles.highest.id
            const role = message.guild.roles.cache.get(roleC)
            message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                await channel.updateOverwrite(roleD, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
                await channel.updateOverwrite(role, {
                  SEND_MESSAGES: true,
                  ADD_REACTIONS: true
                })
            });
            message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
                await channel.updateOverwrite(client.user, {
                    CONNECT: true,
                })
                await channel.updateOverwrite(roleD, {
                    CONNECT: false
                })
                await channel.createOverwrite(role, {
                  CONNECT: true,
                })
            });
            message.channel.send(new MessageEmbed()
              .setDescription(`${emoji.lock} **${message.author.tag}** locked down the server`)
              .setColor("GREEN")
            )
          } else if(args[0] == 'off') { 
          message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
              await channel.updateOverwrite(roleD, {
                SEND_MESSAGES: null,
              })
          });
          message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
              await channel.updateOverwrite(roleD, {
                  CONNECT: null
              })
          });
          message.guild.channels.cache.filter(c => c.type === 'news').forEach(async (channel, id) => {
              await channel.updateOverwrite(roleD, {
                  SEND_MESSAGES: false
              })
          });
          if(message.guild.rulesChannel) {
            await message.guild.rulesChannel.updateOverwrite(roleD, {
                  SEND_MESSAGES: false
              })
          }
           message.channel.send(new MessageEmbed()
              .setDescription(`${emoji.unlock} **${message.author.tag}** unlocked the server`)
              .setColor("GREEN")
           )
        }

         } catch(e) {
             message.channel.send(`There has been an error, **${e}**`)
         }
       
    }
}