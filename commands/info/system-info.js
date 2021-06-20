const {MessageEmbed} = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { re } = require('mathjs');

module.exports = {
    name: 'system-info',
    aliases: ['systemstats', 'system', 'systeminformation'],
    description: 'Gives my system information',
    timeout: 5000,
    usage: '',
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
        .setTitle(`💻 My System Information!!`)
        .setDescription(`\`\`\`yaml\n${systeminfo}\`\`\``)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)

        message.channel.send(embed)
    }
}