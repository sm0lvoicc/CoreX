const { Collection, Client, MessageEmbed, Message } = require("discord.js");
require("discord-reply");
//require(`./dashboard/server`)
const mongoose = require("mongoose");
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
const mongo = config.mongo;
const fs = require("fs");
const DiscordVoice = require("discord-voice");
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
const Topgg = require("@top-gg/sdk");//

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
const Voice = new DiscordVoice(client, config.mongo);
client.discordVoice = Voice;

const Distube = require("distube");
client.distube = new Distube(client, {
  searchSongs: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (message, queue, song) =>
    message.channel.send(
      `Playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\nRequested by: ${song.user}\n${status(queue)}`,
    ),
  )
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ),
  )
  .on("playList", (message, queue, playlist, song) =>
    message.channel.send(
      `Play \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\n${status(queue)}`,
    ),
  )
  .on("addList", (message, queue, playlist) =>
    message.channel.send(
      `Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`,
    ),
  )
  // DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
      `**Choose an option from below**\n${result
        .map(
          (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``,
        )
        .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`,
    );
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
  .on("error", (message, e) => {
    console.error(e);
    message.channel.send("An error encountered: " + e);
  });

// Starboard Feature for On Message Reaction Add

client.login(token);
