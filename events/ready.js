const client = require('../index')
const { prefix } = require('../config.json')

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


})
