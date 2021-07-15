const Discord = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')
const client = require('../../index.js')

module.exports = {
    name: 'github',
    description: 'Search for things on Github',
    usage: 'github <search>',
     timeout: 3000,
    aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send({
            embed:{
                description: `**Please Give Me A Github Username!**`
            }
        })
        fetch(`https://api.github.com/users/${args.join('-')}`)
          .then(res => res.json()).then(body => {
            if(body.message) return message.channel.send({
                embed:{
                    description: ` **User Not Found | Please Give Me A Valid Username!**`
                }
            });
          let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio, type, updated_at } = body;
      
                  const embed = new Discord.MessageEmbed()
                  .setAuthor(`${login} Information!`, avatar_url)
                  .setColor(`RANDOM`)
                  .setThumbnail(`${avatar_url}`)
                  .addField(`Username`, `${login}`)
                  .addField(`ID`, `${id}`)
                  .addField(`Bio`, `${bio || "No Bio"}`)
                  .addField(`Type`, `${type}`)
                  .addField(`Public Repositories`, `${public_repos || "None"}`, true)
                  .addField(`Followers`, `${followers}`, true)
                  .addField(`Following`, `${following}`, true)
                  .addField(`Location`, `${location || "No Location"}`)
                  .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
                  .addField(`Account Last Updated`, `${updated_at}`)
                  .addField(`Link to there profile`, `[Click Here!](https://github.com/${args.join('-')})`)
                  .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                  .setTimestamp()
                  message.channel.send(embed)
    
          })
    }
}