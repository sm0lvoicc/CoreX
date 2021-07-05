module.exports = {
    name: 'twitch',
    description: 'It\'s a suprise!',
    usage: '',
    timeout: 1000,
    userPerms: [''],
    clientPerms: [''],
    run: async(client, message, args) => {
        message.channel.send('Hey guys check out roohancup here in https://twitch.tv/roohancup and while you are at it give him a follow it will mean alot!').then(message => message.react('💖'))
    }
}