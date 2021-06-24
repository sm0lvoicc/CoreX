const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "add-role",
    usage: '<@user | user-id> <rolename>',
    aliases: ['role'],
    timeout: 1000 * 5,
    description: "Adds a role to a user",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        try {

            if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You do not have the permission \`MANAGE_ROLES\`');
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('I do not have the permission \`MANAGE_ROLES\`');
        
        let member = message.mentions.members.first()
        if(!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) return message.reply('That user is not valid.');
        
        const rname = message.content.split(' ').splice(2).join(' ');
        const role = message.guild.roles.cache.find(val => val.name === rname);
        if (!role) return message.reply(`❌**Error:** ${rname} isn't a role on this server!`);
        
        const botRolePosition = message.guild.member(client.user).roles.highest.position;
        const rolePosition = role.position;
        const userRolePossition = message.member.roles.highest.position;
        
        if (userRolePossition <= rolePosition) return message.reply('Your role is lower than the specified role.');
        if (botRolePosition <= rolePosition) return message.reply('My highest role is lower than the specified role.');
        
        member.roles.add(role).catch(e => {
            return message.reply(`❌**Error:**\n${e}`);
        });
        
        const be = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Role Added!')
            .setDescription(`**${message.author}**, I've added the **${rname}** role to **${message.mentions.users.first().username}**`);
        message.channel.send(be);
        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}