const client = require('../index')
const { prefix } = require('../config.json')
const emoji = require(`.././emoji.json`)
const moment = require('moment');
const Discord = require(`discord.js`)
client.on('ready', async() => {
    const ArrayStatus = [
        `${client.guilds.cache.size} amazing servers`,
        `${client.channels.cache.size} channels`,
        `${client.users.cache.size} cool users 😎`,
        `${client.user.tag} bot`, 
        'the developers console💻',
        'With love💖',
        '🤖Join the support server!',
        'use ?help',
        'dsc.gg/corex',
        'with github repo'
    ];

    let index = 0;
    setInterval(() => {
        if(index === ArrayStatus.length) index = 0;
        const status = ArrayStatus[index]
        client.user.setActivity(status);
        index++;
    }, 15000)
    let usersCount = 0;
    for (const guild of client.guilds.cache) {
    usersCount += (await guild[1].members.fetch()).size
    }
    await console.log(`${client.user.tag} is now connected to Discord, Cached ${usersCount} Users`);



    const channel = client.channels.cache.get(`862315521168506920`)
    const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 
    const text = `${emoji.online} **${client.user.tag}** is now online \n \n ${emoji.success} **${time}** \n \n ${emoji.member} **Cached ${usersCount} Users**`

    const embed = new Discord.MessageEmbed()
    .setDescription(text)
    .setColor(`GREEN`)
    channel.send(embed)


})
