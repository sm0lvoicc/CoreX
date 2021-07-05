const client = require('../index')
const { MessageEmbed } = require('discord.js');
Nuggies = require('nuggies')

client.on('clickMenu', async (menu) => {
	Nuggies.dropclick(client, menu);
});