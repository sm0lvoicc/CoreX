const schema = require("../models/logs");
const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("channelCreate", async (channel) => {
  if (!channel.guild) return;

  schema.findOne({ Guild: channel.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channelSend = channel.guild.channels.cache.get(data.Channel);
    if (!channelSend || channelSend.available) return;

    let types = {
      text: "Text Channel",
      voice: "Voice Channel",
      null: "No Type",
      news: "Announcement Channel",
      store: "Store Channel",
      category: "Category",
    };

    const channelCreate = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("Channel Created", channel.guild.iconURL())
      .addField("Channel Name", channel.name)
      .addField("Channel Type", `\`\`\`${types[channel.type]}\`\`\``)
      .setFooter(`Channel ID: ${channel.id}`);

    channelSend.send(channelCreate);
  });
});

client.on("channelDelete", async (channel) => {
  if (!channel.guild) return;

  let types = {
    text: "Text Channel",
    voice: "Voice Channel",
    null: "No Type",
    news: "Announcement Channel",
    store: "Store Channel",
    category: "Category",
  };

  schema.findOne({ Guild: channel.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channelSend = channel.guild.channels.cache.get(data.Channel);
    if (!channelSend || channelSend.available) return;

    const channelDelete = new MessageEmbed()
      .setColor("RED")
      .setAuthor("Channel Deleted", channel.guild.iconURL())
      .addField("Channel Name", channel.name)
      .addField("Channel Type", `\`\`\`${types[channel.type]}\`\`\``)
      .setFooter(`Channel ID: ${channel.id}`);

    channelSend.send(channelDelete);
  });
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  if (!newChannel.guild) return;

  schema.findOne({ Guild: newChannel.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channel = newChannel.guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;

    if (oldChannel.name !== newChannel.name) {
      const channelNameChange = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor("CHANNEL UPDATE - NAME", newChannel.guild.iconURL())
        .addField("Old Name", oldChannel.name)
        .addField("New Name", newChannel.name)
        .setFooter(`Channel ID: ${newChannel.id}`);

      channel.send(channelNameChange);
    }

    let types = {
      text: "Text Channel",
      voice: "Voice Channel",
      null: "No Type",
      news: "Announcement Channel",
      store: "Store Channel",
      category: "Category",
    };

    let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";

    if (oldChannel.type !== newChannel.type) {
      const channelTypeChange = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor("CHANNEL UPDATE - TYPE", newChannel.guild.iconURL())
        .addField("Channel Name", newChannel.name)
        .addField("Old Type", `${types[oldChannel.type]}`)
        .addField("New Type", `${types[newChannel.type]}`)
        .setFooter(`Channel ID: ${newChannel.id}`);

      channel.send(channelTypeChange);
    }

    if (oldChannel.topic !== newChannel.topic) {
      if (oldChannel.topic == null) {
        oldChannel.topic = "No topic";
      }

      if (newChannel.topic == null) {
        newChannel.topic = "No topic";
      }
      const channelTopicChange = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor("CHANNEL UPDATE - TOPIC", newChannel.guild.iconURL())
        .addField("Channel Name", newChannel.name)
        .addField("Old Topic", `\`\`\`${oldChannel.topic}\`\`\``)
        .addField("New Topic", `\`\`\`${newChannel.topic}\`\`\``)
        .setFooter(`Channel ID: ${newChannel.id}`);

      channel.send(channelTopicChange);
    }
  });
});

client.on("channelPinsUpdate", async (channel, time) => {
  if (!channel.guild) return;

  schema.findOne({ Guild: channel.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;

    const channelSend = channel.guild.channels.cache.get(data.Channel);
    if (!channelSend || channelSend.available) return;

    const channelPinsChange = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("CHANNEL UPDATE - PINS", channel.guild.iconURL())
      .addField("Channel Name", channel.name)
      .addField("Pinned At", time)
      .setFooter(`Channel ID: ${channel.id}`);

    channelSend.send(channelPinsChange);
  });
});
//set to change later on
