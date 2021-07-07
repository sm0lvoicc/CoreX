const {MessageEmbed} = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { re } = require('mathjs');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'system-info',
    aliases: ['systemstats', 'system', 'systeminformation'],
    description: 'Gives my system information',
    timeout: 5000,
    usage: '',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {

        const { totalMemMb, usedMemMb } = await mem.info();

        const systeminfo = stripIndent`
        OS        : ${await os.oos()}
        CPU       : ${cpu.model()}
        Cores     : ${cpu.count()}
        CPU Usage : ${await cpu.usage()} %
        RAM       : ${totalMemMb} MB
        RAM Usage : ${usedMemMb} MB 
        `;

        const embed = new MessageEmbed()
        .setTitle(`${emoji.settings} My System Information!!`)
        .setDescription(`\`\`\`yaml\n${systeminfo}\`\`\``)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)

        message.channel.send(embed)
    }
}