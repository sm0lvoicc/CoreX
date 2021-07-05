const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/notes')

module.exports = {
    name: 'note',
    description: 'Adds a note to a user.',
    timeout: 4000,
    usage: '<@user || user.id> <note>',
    aliases: ['add-note'],
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let user = message.mentions.members.first();
        if(!user) {
            user = message.guild.members.cache.get(args[0])
        }
        if(!user) return message.channel.send('Please mention a user to set there note')
        
        const note = args.slice(1).join(' ')
        if(!note) return message.channel.send('Please specify a note to add to that user')

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
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,

                    content : [
                        {
                            moderator : message.author.id,
                            reason : note,
                            ID: random,
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : note,
                    ID: random,
                }
                data.content.push(obj)
            }
            data.save()
        });

        message.channel.send(new MessageEmbed().setColor('GREEN').setDescription(`<:corexyes:860561725916053514> Added a note to **${user.user.username}**`).setTimestamp())
    }
}