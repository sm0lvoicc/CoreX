const db = require('../models/logs-server');
const client = require('../index')
const { MessageEmbed } = require('discord.js')

client.on('guildUpdate', async(oldGuild, newGuild) => {
    db.findOne({ Guild: newGuild.id}, async(err, data) => {
        if(!data) return;
        const channel = newGuild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;

        if(oldGuild.name !== newGuild.name) {
            const nameChange = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('SERVER UPDATE - NAME', client.user.displayAvatarURL())
            .addField('Old Server name', `\`\`\`${oldGuild.name}\`\`\``)
            .addField('New Server Name', `\`\`\`${newGuild.name}\`\`\``)
            .setFooter(`Server ID: ${newGuild.id}`)
            channel.send(nameChange)
        } else if(oldGuild.region !== newGuild.region) {
            const regionChange = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('SERVER UPDATE - REGION', client.user.displayAvatarURL())
            .addField('Old Server region', `\`\`\`${oldGuild.region}\`\`\``)
            .addField('New Server region', `\`\`\`${newGuild.region}\`\`\``)
            .setFooter(`Server ID: ${newGuid.id}`)
            channel.send(regionChange)
        } else if(oldGuild.description !== newGuild.description) {
            const descChange = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('SERVER UPDATE - DESCRIPTION', client.user.displayAvatarURL())
            .addField('Old Server description', `\`\`\`${oldGuild.description}\`\`\``)
            .addField('New Server description', `\`\`\`${newGuild.description}\`\`\``)
            .setFooter(`Server ID: ${newGuid.id}`)
            channel.send(descChange)
        }
    })
})

client.on('emojiCreate', async(emoji) => {
    db.findOne({ Guild: emoji.guild.id}, async(err, data) => {
        if(!data) return;
        const channel = emoji.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;

        const emojiCreate = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('EMOJI CREATED', client.user.displayAvatarURL())
        .addField('Emoji Name', `\`\`\`${emoji.name}\`\`\``)
        .addField('Emoji URL', `${emoji.url}`)
        .addField('Emoji', emoji)
        .setFooter(`Emoji ID: ${emoji.id}`)
        channel.send(emojiCreate)
    })
})

client.on('emojiDelete', async(emoji) => {
    db.findOne({ Guild: emoji.guild.id}, async(err, data) => {
        if(!data) return;
        const channel = emoji.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;

        const emojiDelete = new MessageEmbed()
        .setColor('RED')
        .setAuthor('EMOJI DELETED', client.user.displayAvatarURL())
        .addField('Emoji Name', `\`\`\`${emoji.name}\`\`\``)
        .addField('Emoji URL', `${emoji.url}`)
        .setFooter(`Emoji ID: ${emoji.id}`)
        channel.send(emojiDelete)
    })
})

client.on('emojiUpdate', async(oldEmoji, newEmoji) => {
    db.findOne({ Guild: newEmoji.guild.id}, async(err, data) => {
        if(!data) return;
        const channel = newEmoji.guild.channels.cache.get(data.Channel);
        if(!channel || channel.available) return;

        if(oldEmoji.name !== newEmoji.name) {
            const emojiUpdate = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('EMOJI UPDATED - NAME', client.user.displayAvatarURL())
            .addField('Old Emoji Name', `\`\`\`${oldEmoji.name}\`\`\``)
            .addField('New Emoji Name', `\`\`\`${newEmoji.name}\`\`\``)
            .addField('Emoji URL', `${newEmoji.url}`)
            .addField('Emoji', newEmoji)
            .setFooter(`Emoji ID: ${newEmoji.id}`)
            channel.send(emojiUpdate)
        }
    })
})


client.on('guildDelete', async (guild) => {
    db.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            db.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})