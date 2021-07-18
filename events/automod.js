const client = require("../index");
const db = require("quick.db");
const emoji = require("../emoji.json");
const { MessageEmbed } = require("discord.js");

//Anti-Raid
client.on("guildMemberAdd", async (member) => {
  const raid = db.fetch(`Anti-raid_${member.guild.id}`);
  if (raid === null) return;
  reason = "Anti-Raid Enabled";
  try {
    member.send(
      `${emoji.error} Anti-Raid mode is enabled in **${member.guild.name}**`,
    );
  } catch (err) {
    return;
  }
  member.kick(reason);
});

const usersMap = new Map();
client.on("message", async (message) => {
  if (message.member.hasPermission(["ADMINISTRATOR", "MANAGE_GUILD"])) return;
  //Anti-Spam
  if (message.author.bot) return;
  if (!message.guild) return;
  const AntiSpam = db.fetch(`Anti-spam_${message.guild.id}`);
  if (AntiSpam === null) return;
  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    let msgCount = userData.msgCount;
    if (parseInt(msgCount) === 7) {
      message.delete();
      message.channel
        .send(`${emoji.error} ${message.member} No Spamming`)
        .then((msg) => msg.delete({ timeout: 2000 }));
    } else {
      msgCount++;
      userData.msgCount = msgCount;
      usersMap.set(message.author.id, userData);
    }
  } else {
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: null,
    });
    setTimeout(() => {
      usersMap.delete(message.author.id);
    }, 5000);
  }

  //Anti-curse
  const badwords = require("../curses.json");
  const AntiCurse = db.fetch(`Anti-curse_${message.guild.id}`);
  if (AntiCurse === null) return;
  for (let i = 0; i < badwords.length; i++) {
    if (message.content.includes(badwords[i])) {
      message.delete();
      message.channel
        .send(`${emoji.error} ${message.member} No Bad Words Allowed`)
        .then((msg) => msg.delete({ timeout: 2000 }));
    }
  }

  //Anti-link
  const AntiLink = db.fetch(`Anti-link_${message.guild.id}`);
  if (AntiLink == null) return;
  const validURL = (str) => {
    var regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  };
  if (validURL(message.content)) {
    message.delete();
    message.channel
      .send(`${emoji.error} ${message.member} No Links Allowed`)
      .then((msg) => msg.delete({ timeout: 2000 }));
  }

  //Anti-Invite
  const AntiInvite = db.fetch(`Anti-invite_${message.guild.id}`);
  if (AntiInvite === null) return;
  const adURL = (str) => {
    var regex =
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/;
    if (!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  };
  if (adURL(message.content)) {
    message.delete();
    message.channel
      .send(`${emoji.error} ${message.member} No Invite Links Allowed`)
      .then((msg) => msg.delete({ timeout: 2000 }));
  }
});
