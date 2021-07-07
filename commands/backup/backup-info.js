const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'backup-info',
    description: 'Shows information about a Backup ID',
    timeout: 5000,
    usage: '<ID>',
    aliases: ['b-info'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['ADMINISTRATOR'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let backupID = args[0];
        if(!backupID){
            return message.channel.send("You must specify a valid backup ID!");
        }

        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            
            let embed = new MessageEmbed()
                .setAuthor(`${emoji.info} Backup Informations`)
                .addField(`${emoji.id} Backup ID`, backupInfos.id, false)
                .addField(`${emoji.inbox} Server ID`, backupInfos.data.guildID, false)
                .addField(`${emoji.question} Size`, `${backupInfos.size} kb`, false)
                .addField(`${emoji.globe} Created at`, formatedDate, false)
                .setColor("BLURPLE");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(`${emoji.error} No backup found for \`${backupID}\``);
        });
    }
}