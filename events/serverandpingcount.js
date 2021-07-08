const client = require(`../index`)
const Discord = require(`discord.js`)

client.on('ready', async() => {
    const guild = client.guilds.cache.get('818760629920989225');
    setInterval(() =>{
        const channel = guild.channels.cache.get('862369853289398273');
        const channel2 = guild.channels.cache.get('862369910969466931');
        channel.setName(`📚 Total Servers: ${client.guilds.cache.size}`);
        channel2.setName(`🏓 Ping: ${Math.round(client.ws.ping)}ms`);
    }, 300000); // updates every 5 mins 
    // discord api limits 
})