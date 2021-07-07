const { MessageEmbed, Util, Discord } = require(`discord.js`)
// fuck you node.js

module.exports = {
    name: 'enlarge',
    timeout: 5000, 
    aliases: [''],
    description: 'enlarge emoji png/gif',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {
        const emoji = args[0];
        if (!emoji) return message.lineReplyNoMention(`Please Give Me A Emoji!`);

        let customemoji = Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;

            return message.lineReplyNoMention(Link);
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.lineReplyNoMention(`Please Give Me A Valid Emoji!`);
            message.lineReplyNoMention(
                `You Can Use Normal Emoji Without Adding In Server!`
            );
        }

    }
}