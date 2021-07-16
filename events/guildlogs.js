const client = require("../index");
const { MessageEmbed } = require("discord.js");
logChannel = "830136425873801267";

client.on("guildCreate", (guild) => {
  client.channels.cache
    .get(logChannel)
    .send(
      new MessageEmbed()
        .setTitle("NEW SERVER")
        .addField(
          "SERVER INFO",
          `${guild.name} (${guild.id}) **${guild.memberCount}** members`,
        )
        .addField("SERVER OWNER", `${guild.owner.user.tag} (${guild.owner.id})`)
        .setThumbnail(guild.iconURL())
        .setFooter(`I am in ${client.guilds.cache.size} servers`)
        .setColor("GREEN"),
    )
    .then((msg) => msg.channel.send("<@&857186373294358548>"));
});

client.on("guildDelete", (guild) => {
  client.channels.cache
    .get(logChannel)
    .send(
      new MessageEmbed()
        .setTitle("REMOVED FROM SERVER :(")
        .addField(
          "SERVER INFO",
          `${guild.name} (${guild.id}) **${guild.memberCount}** members`,
        )
        .addField("SERVER OWNER", `${guild.owner.user.tag} (${guild.owner.id})`)
        .setThumbnail(guild.iconURL())
        .setFooter(`I am in ${client.guilds.cache.size} servers`)
        .setColor("RED"),
    );
});
