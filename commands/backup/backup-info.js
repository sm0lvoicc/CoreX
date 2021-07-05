const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')

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
                .setAuthor("<:corexinfo:860565886111580172> Backup Informations")
                .addField("<:corexchannel:860560876792840202> Backup ID", backupInfos.id, false)
                .addField("<:corexinbox:860563596818513920> Server ID", backupInfos.data.guildID, false)
                .addField("<:corexsupport:860567555114270740> Size", `${backupInfos.size} kb`, false)
                .addField("<:corexjoin:860563858301517864> Created at", formatedDate, false)
                .setColor("RANDOM");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send("<:corexerror:860580531825147994> No backup found for `"+backupID+"`!");
        });
    }
}