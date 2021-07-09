const Guild = require('../models/membercountchannel');
const client = require('../index')

client.on('guildMemberAdd', async (member) => {
    let guildProfile = await Guild.findOne({ guildID: member.guild.id });
    let totalCounter = member.guild.channels.cache.get(guildProfile.memberCounterTotal);
    let userCounter = member.guild.channels.cache.get(guildProfile.memberCounterUser);
    let botCounter = member.guild.channels.cache.get(guildProfile.memberCounterBot);
    if (!guildProfile.memberCounterTotal || guildProfile.memberCounterTotal == 'disabled') {
        return;
    } else {
        totalCounter.setName(`🌎 Total: ${member.guild.memberCount}`);
        userCounter.setName(`👤 Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        botCounter.setName(`🤖 Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    }
})
