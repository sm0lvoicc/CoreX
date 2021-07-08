const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const invite = require("../../config.json").invite;
let color = "#2f3136";
const emoji = require("../../emoji.json");

module.exports = {
  name: "help",
  aliases: ["commands"],
  description: "Shows all available bot commands.",
  timeout: 1000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (client, message, args) => {
    const p = await client.prefix(message);

    if (!args[0]) {
      let categories = [];

      //categories to ignore
      let ignored = ["owner"];

      const emo = {
        info: emoji.info,
        utility: emoji.pen,
        fun: emoji.console,
        moderation: emoji.ban,
        misc: emoji.globe,
        support: emoji.question,
        image: emoji.image,
        config: emoji.settings,
        logging: emoji.inbox,
        member_system: emoji.member,
        backup: emoji.cloud,
        automod: emoji.spark,
        alt: emoji.kick,
        voice: emoji.voice,
      };

      readdirSync("./commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        let cats = new Object();

        cats = {
          name: name,
          value: `\`${p}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(
          `\`\`\`js\nPrefix: ${p}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](https://dsc.gg/corex) | [Vote for me](https://top.gg/bot/819643325177921587/vote) | [Support](${invite})\n\nTo check out a category, use command \`${p}help [category]\`\n\n__**Categories**__`,
        )
        .addFields(categories)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          }),
        )
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          }),
        )
        .setColor(color);

      return message.channel.send(embed);
    } else {
      let cots = [];
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js"),
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = client.commands.get(name).description;

          let obj = {
            cname: `\`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: `**${co.des ? co.des : "No Description"}**`,
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase()),
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`,
          )
          .setDescription(
            `Use \`${p}help\` followed by a command name to get more information on a command.\nFor example: \`${p}help ping\`.\n\n`,
          )
          .addFields(catts)
          .setColor(color);

        return message.channel.send(combed);
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `<:corexerror:860580531825147994> Invalid category/command! Use \`${p}help\` for all of my commands!`,
          )
          .setColor("RED");
        return message.channel.send(embed);
      }

      const commandCooldown =
        ((command.timeout % 60000) / 1000).toFixed(0) + "s";
      const embed = new MessageEmbed()
        .setTitle("<:corexinfo:860565886111580172> Command Details:")
        .setDescription(
          `
                **Command:** ${
                  command.name ? command.name : "No name for this command."
                }
                **Description:** ${
                  command.description
                    ? command.description
                    : "No description for this command."
                }
                **Aliases:** ${
                  command.aliases
                    ? command.aliases.join("` `")
                    : "No aliases for this command."
                }
                **Usage:** ${
                  command.usage ? command.usage : `${p}${command.name}`
                }
                **Cool Down:** ${
                  commandCooldown ? commandCooldown : "No cooldown"
                }
                `,
        )
        .setColor(color);
      return message.channel.send(embed);
    }
  },
};
