const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'anti-alt',
    description: 'Setup anti-alt for the server',
    timeout: 7000,
    usage: '<true/false> <No. of days>',
    aliases: ['set-alt'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINSTRATOR\`')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission \`KICK_MEMBERS\`')

        options = [
          'set-avatar',
          'set-days',
          'disable'
      ]

      if (!args.length) return message.reply("Please enter either **set-days**, **set-avatar** or **disable**")
      const opt = args[0].toLowerCase();
      if (!opt) return message.reply("Please enter either **set-days**, **set-avatar** or **disable**")


      if (!options.includes(opt)) return message.reply("Please enter either **set-days**, **set-avatar** or **disable**")

      if(opt == 'set-avatar') {
        const avatar = args[0]
        if(!avatar) return message.reply('Please set the avatar checking to either **True** or **False**')
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
          if(args[0] == 'True') {
            schema.findOneAndUpdate({ Guild: message.guild.id}, { Avatar: true})
            message.channel.send(`Default Avatar has been set to \`True\``)
          } if(args[0] == false) {
            schema.findOneAndUpdate({ Guild: message.guild.id}, { Avatar: false})
            message.channel.send(`Default Avatar has been set to \`False\``)

          }
        })

      }

      if(opt == 'set-days') {
        const days = args[0]
        if(!days) return message.reply('Please set the account age needed to join the server.')
        if(isNaN(days)) return message.channel.send(`Days must be a number`)

        schema.findOne({Guild: message.guild.id}, async(err, data) => {
          if(data) {
            schema.findOneAndUpdate({ Guild: message.guild.id}, {Days: days})
            message.channel.send(`Update Anti-Alt days ${days}`)
          } else if(!data) {
            data.Days = days
            message.channel.send(`Set Anti-Alt days to ${days}`)
          }
        })

      }

       if(opt == 'disable') {
         schema.findOne({ Guild: message.guild.id}, async(err, data) => {
           if(!data) return message.reply('Anti-Alt is already disabled')
           data.delete()
           message.reply('Anti-Alt is disabled')
         })
       }

    }
}