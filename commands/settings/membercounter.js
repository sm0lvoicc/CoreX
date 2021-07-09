const Guild = require('../../models/membercountchannel');
const Discord = require('discord.js');

module.exports = {
	name: 'membercounter',
	description: 'Create a catagorie and channels for member counters.',
    timeout: 1500,
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
    run : async(client, message, args) => {
        const p = await client.prefix(message);
        let guildProfile = await Guild.findOne({ guildID: message.guild.id });

        if (guildProfile.memberCounterTotal === "disabled" || !guildProfile.memberCounterTotal) {
            if (!args[0]) {
                const Embed = new Discord.MessageEmbed()
                    .setTitle(`Setup for Member Counter`)
				    .setColor("#FFFF00")
                    .addField(`What?`, `This creates 3 voice channels which will display the amount of Bots, Users and Total amount of users.`)
                    .addField(`How?`, `To confirm the creation of Member counter, use \`${p}membercounter confirm\``)
                    .addField(`Removal?`, `To remove the member count please run \`${p}membercounter remove\` and then manually delete the channels.`)
                    .setFooter(client.user.tag ,client.user.displayAvatarURL())
				    .setTimestamp();
                return message.channel.send(Embed);

            } else if (args[0] === "confirm") {
                const totalCounter = await message.guild.channels.create(`🌎 Total: ${message.guild.memberCount}`, {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ['CONNECT']
                        }
                    ]
                });
                const userCounter = await message.guild.channels.create(`👤 Users: ${message.guild.members.cache.filter(m => !m.user.bot).size}`, {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ['CONNECT']
                        }
                    ]
                });
                const botCounter = await message.guild.channels.create(`🤖 Bots: ${message.guild.members.cache.filter(m => m.user.bot).size}`, {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ['CONNECT']
                        }
                    ]
                });
                const Embed = new Discord.MessageEmbed()
                    .setTitle(`Setup for Member Counter`)
				    .setColor("#FFFF00")
                    .addField(`Finished`, `I've created the Member Counter! Move the channels wherever you want. Changing the name won't do anything as it will overwrite it the next time it updates!`)
                    .addField(`Removal?`, `To remove the member count please run \`${p}membercounter remove\` and then manually delete the channels.`)
                    .setFooter(client.user.tag ,client.user.displayAvatarURL())
				    .setTimestamp();
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterTotal: `${totalCounter.id}`, lastEdited: Date.now() });
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterUser: `${userCounter.id}`, lastEdited: Date.now() });
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterBot: `${botCounter.id}`, lastEdited: Date.now() });
                return message.channel.send(Embed);
            } else if (args[0] === "remove") {
                const Embed = new Discord.MessageEmbed()
                    .setTitle(`Removal of Member Counter`)
				    .setColor("#ff0000")
                    .addField(`Failed`, `There is nothing to delete.`)
                    .setFooter(client.user.tag ,client.user.displayAvatarURL())
				    .setTimestamp();
                return message.channel.send(Embed);
            }
        } else if (args[0] === "remove") {
            const Embed = new Discord.MessageEmbed()
                .setTitle(`Removed Member Counter`)
				.setColor("#FFFF00")
                .addField(`Removed`, `I've removed the member counter. You may now delete the channels.`)
                .setFooter(client.user.tag ,client.user.displayAvatarURL())
				.setTimestamp();
            await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterTotal: `disabled`, lastEdited: Date.now() });
            await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterUser: `disabled`, lastEdited: Date.now() });
            await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberCounterBot: `disabled`, lastEdited: Date.now() });
            return message.channel.send(Embed);
        } else if (!args[0]) {
            const Embed = new Discord.MessageEmbed()
                .setTitle(`Setup for Member Counter`)
				.setColor("#FFFF00")
                .addField(`What?`, `This creates 3 voice channels which will display the amount of Bots, Users and Total amount of users.`)
                .addField(`How?`, `To confirm the creation of Member counter, use \`${p}membercounter confirm\``)
                .addField(`Removal?`, `To remove the member count please run \`${p}membercounter remove\` and then manually delete the channels.`)
                .setFooter(client.user.tag ,client.user.displayAvatarURL())
				.setTimestamp();
            return message.channel.send(Embed);
        } else if (args[0] === "confirm") {
            const Embed = new Discord.MessageEmbed()
                .setTitle(`Setup for Member Counter`)
				.setColor("#ff0000")
                .addField(`Failed`, `You have already created a member counter`)
                .setFooter(client.user.tag ,client.user.displayAvatarURL())
				.setTimestamp();
            return message.channel.send(Embed);
        }
    }
}