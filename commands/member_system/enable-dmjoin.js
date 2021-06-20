const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/dmjoin')

module.exports = {
    name: 'enable-dmjoin',
    description: 'Enables dm join when a member joins the server.',
    timeout: 6000,
    usage: '<text>',
    aliases: ['e-dmjoin'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        const text = args.join(" ")

        const noText = new MessageEmbed()
      .setTitle(`Available tags`)
      .setDescription(` **{user}** : <@New-Member> \n **{server}** : Server Name \n **{user.tag}** : New-Member-Tag \n **{user.id}** : New-Member-ID \n **{membercount}** : Total Members`)
      .setFooter(`More Soon`)
      .setColor("RANDOM")

      if(!text) return message.channel.send(noText)

      schema.findOne({ Guild: message.guild.id}, async(err, data) => {
        if(err) throw err;
        if(data) data.delete()
        new schema({
          Guild: message.guild.id,
          Text: text
        }).save()
        const dmjoin = text.replace(/{user}/,`<@${message.author.id}>`).replace(/{server}/,message.guild.name).replace(/{user.tag}/,message.author.tag).replace(/{user.id}/, message.author.id).replace(/{membercount}/,message.guild.memberCount)
        message.member.send(dmjoin).catch(err => {
            return
      })
      })
    }
}