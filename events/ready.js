const client = require('../index')
const { prefix } = require('../config.json')

client.on('ready', () => {
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
        'github repo'
    ];

    let index = 0;
    setInterval(() => {
        if(index === ArrayStatus.length) index = 0;
        const status = ArrayStatus[index]
        client.user.setActivity(status);
        index++;
    }, 15000)
    console.log('Bot online')
    console.log(`${client.user.tag} is ready for takeoff`)


})
