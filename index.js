const {
    Collection,
    Client,
    MessageEmbed,
    Message
} = require('discord.js')
require('discord-reply'); 
const mongoose = require('mongoose');
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const mongo = config.mongo
const fs = require('fs')
const client = new Client({
    disableMentions: 'everyone'
})
require('discord-buttons')(client);
module.exports = client;

require('events').EventEmitter.defaultMaxListeners = 100;


client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection()



const modLogsSchema = require('./models/modlogs');


client.modlogs = async function ({
    Member,
    Color,
    Action,
    Reason
}, message) {
    const data = await modLogsSchema.findOne({
        Guild: message.guild.id
    });
    if (!data) return;

    const channel = await message.guild.channels.cache.get(data.Channel);
    const embedLog = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle(`Action: ${Action}`)
        .setThumbnail(client.user.displayAvatarURL())
        .addField('Saff', `${message.author} (${message.author.id})`)
        .addField('Member', `${Member} (${Member.id})`)
        .addField('Reason', `\`${Reason}\``)
        .setColor(Color)

    channel.send(embedLog)
}

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


mongoose.connect(`${mongo}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to database!'))


const prefixSchema = require('./models/prefix')
/**
 * @param {Client} client
 */
client.prefix = async function (message) {
    let custom;

    const data = await prefixSchema.findOne({
            Guild: message.guild.id
        })
        .catch(err => console.log(err))

    if (data) {
        custom = data.Prefix;
    } else {
        custom = prefix;
    }
    return custom;
}



client.login(token)