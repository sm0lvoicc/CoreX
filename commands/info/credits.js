const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "credits",
  description: "Shows all the amazing people that have helped make this bot.",
  timeout: 1000,
  aliases: ["creds", "devs"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    credit1 = client.users.cache.get("451202806653648936"); // developer
    credit2 = client.users.cache.get("538668078012039168"); // developer
    credit3 = client.users.cache.get("533776358980059137"); 
    credit4 = client.users.cache.get("805729557357133826"); 
    credit5 = client.users.cache.get("582012181638414357"); // developer
    credit6 = client.users.cache.get("537875750955778058");
    credit7 = client.users.cache.get("708635694154776657"); // developer
    credit8 = client.users.cache.get("510166383523528705"); // developer

    const embedCredits = new MessageEmbed()
      .setColor("BLURPLE")
      .addFields(
        {
          name: "You",
          value:
            "Best person ever for helping make CoreX better and growing the bot!",
        },
        {
          name: credit1.tag,
          value: "Core Developer of CoreX AKA the best person ever",
        },
        {
          name: credit2.tag,
          value:
            "Core Developer of CoreX, got the idea of making CoreX, also join his [Server](https://discord.gg/cKUrkEtMkA) ",
        },
          {
          name: credit5.tag,
          value:
            "Amazing Developer, She has helped Polish CoreX and find many bugs in it, join her [Server](https://discord.gg/single)",
        },
          {
          name: credit7.tag,
          value: "Core Developer of CoreX, He has helped with adding new commands and thinking of new additions we could add, and a very nice guy.",
        },
          {
          name: credit8.tag,
          value: "Core Developer of CoreX, He is the newest addition to the developer team, And we look forward to be working with him.",
        },
        {
          name: credit3.tag,
          value:
            "A team member in CoreX, he has helped fix bugs and make CoreX better, also you can join his [Server](https://discord.gg/8qPDvefgHz)",
        },
        {
          name: credit4.tag,
          value:
            "He has helped grow CoreX and make it a better bot, also join his [Server](https://discord.gg/cCp7yGzvBG)",
        },
        {
          name: credit6.tag,
          value:
            "Graphic Designer who has helped change CoreX's logo and overall design, join his [Server](https://discord.gg/EgT7tTR6kx)",
        },
      )
      .setFooter("We love you 💖")
      .setTimestamp();
    message.channel.send(embedCredits);
  },
};
