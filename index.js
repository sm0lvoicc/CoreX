const { Collection, Client, MessageEmbed, Message } = require("discord.js");
require("discord-reply");
//require(`./dashboard/server`)
const mongoose = require("mongoose");
const config = require("./config.json");
const prefix = config.bot.prefix;
const token = config.bot.token;
const mongo = config.database.mongodb;
const fs = require("fs");
const client = new Client({
  disableMentions: "everyone",
});
const logs = require("discord-logs");
logs(client);
module.exports = client;
require("events").EventEmitter.defaultMaxListeners = 200;
require("discord-buttons")(client);
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

//top.gg stuff
const Topgg = require("@top-gg/sdk");

const api = new Topgg.Api("token");

setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size,
    shardCount: client.options.shardCount,
  });
}, 43200000);

//Mod logs
const modLogsSchema = require("./models/modlogs");

client.modlogs = async function ({ Member, Color, Action, Reason }, message) {
  const data = await modLogsSchema.findOne({ Guild: message.guild.id });
  if (!data) return;

  const channel = await message.guild.channels.cache.get(data.Channel);
  const embedLog = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`Action: ${Action}`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Staff", `${message.author} (${message.author.id})`)
    .addField("Member", `${Member} (${Member.id})`)
    .addField("Reason", `\`${Reason}\``)
    .setColor(Color);

  channel.send(embedLog);
};

client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

mongoose
  .connect(`${mongo}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(console.log("Connected to database!"));

const prefixSchema = require("./models/prefix");
/**
 * @param {Client} client
 */
client.prefix = async function (message) {
  let custom;

  const data = await prefixSchema
    .findOne({ Guild: message.guild.id })
    .catch((err) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};
// const { Player } = require("discord-player");
// client.player = new Player(client, {
//   leaveOnEnd: true,
//   leaveOnEndCooldown: 60000,
//   leaveOnEmpty: true,
//   leaveOnEmptyCooldown: 60000,
//   autoSelfDeaf: true,
//   enableLive: true,

// });
// client.filters = require('./filters.json').filters;
// const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

// for (const file of player) {
//     const event = require(`./player/${file}`);
//     client.player.on(file.split(".")[0], event.bind(null, client));
// };


// Starboard Feature for On Message Reaction Add

client.login(token);
