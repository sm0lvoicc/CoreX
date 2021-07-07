const Color = `RANDOM`;
const Fetch = require("node-fetch"); 
const Discord = require('discord.js');
const client = require('../index')
const schema = require('../models/autoneko');

client.on('ready', () => {
	

    schema.findOne({}, async(err, data) => {
        if(!data) return;
        if(err) throw err;
        const channel = client.channels.cache.get(data.Channel)
        if(!channel || channel.available) return;


    setInterval(async() => {
        const sub = [
            "Cuteanimenekos",
            "Waifu",
        ];

        const Rads = sub[Math.floor(Math.random() * sub.length)];

        const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

        const json = await res.json();

        if (!json[0]) return message.channel.send(`Sorry but a error ocurred while sending the neko `);

        const data = json[0].data.children[0].data;
        const Embed = new Discord.MessageEmbed()
            .setColor(Color)
            .setURL(`https://reddit.com${data.permalink}`)
            .setTitle(data.title)
            .setDescription(`Author : ${data.author}`)
            .setImage(data.url)
            .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
            .setTimestamp();

      await channel.send(Embed).catch(console.error)

    }, 900000) //sends every 15 mins
    })


})