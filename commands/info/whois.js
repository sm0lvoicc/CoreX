const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "whois",
    description: 'Shows info about a user.',
    timeout: 1000,
    aliases: ['user-info'],
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:corexonline:860558476605259786> Online";
                break;
            case "dnd":
                status = "<:corexdnd:860559556856905738> DND";
                break;
            case "idle":
                status = "<:corexidle:860559801574490162> Idle";
                break;
            case "offline":
                status = "<:corexoffline:860559556467753011> Offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`<:corexinfo:860565886111580172> ${user.user.username} infos`)
            .setColor(`#f3f3f3`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "<:corexmention:860565536835502110> Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "<:corexchannel:860560876792840202> Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "<:corexactive:860562182928334939> Current Status: ",
                    value: status,
                    inline: true
                },
                {
                    name: "<:corexslash:860562666422534184> ID: ",
                    value: user.user.id,
                },
                {
                    name: "<:corexdesktop:860563196100214785> Activity: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `No game`,
                    inline: true
                },
                {
                    name: '<:corexinbox:860563596818513920> Creation Date: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '<:corexjoin:860563858301517864> Joined Date: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '<:corexrole:861343406365343875> User Roles: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}