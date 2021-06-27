const client = require('../index')
const { Collection, MessageEmbed } = require('discord.js')
const { prefix, invite } = require('../config.json');
const prefixSchema = require('../models/prefix')
const Timeout = new Collection();
const ms = require('ms')
const premiumServer = require("../models/premium")
const blacklist = require('../models/blacklist');
const schema = require('../models/custom-commands');
const antiPing = require('../models/anti-ping')

client.on('message', async message =>{
    if(!message.guild) return;
    if(message.author.bot) return;
   
    //anti-ping
    antiPing.findOne({ Guild: message.guild.id }, async(err,data1) => {
        if(data1) {
          const member = message.mentions.members.first()
          if(member) {
              if(member.id == message.author.id) return;
              if(message.author.bot) return;
            if(data1.Member.includes(member.id)) {
              message.channel.send(new MessageEmbed().setDescription(`**:no_entry: You can't ping \`${member.user.tag}\`**`).setColor("RED"))
            message.delete()
            }
          }
        }
      })

    //prefix
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        const embedPinged = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Hello my name is **${client.user.tag}**`)
        .setDescription('I am a multi-purpose discord bot meant to help your server!')
        .addField('My usage', `My prefix in this server is \`${p}\` and you can start by typing \`${p}help\` to see all my commands`)
        .addField('My Invites', `[Support](${invite}) | [Invite Me](https://dsc.gg/corex) |  [Vote for me](https://top.gg/bot/819643325177921587/vote)`)
        .setFooter('Thanks 💖', client.user.displayAvatarURL({ dynamic: true}))
        if(message.content === `<@!${client.user.id}>`) return message.channel.send(embedPinged)
    }
    if (!message.content.startsWith(p)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message);
    //command handling
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)

    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //premium stuff
    let premium = await premiumServer.findOne({ Guild: message.guild.id });

    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            const data = await schema.findOne({ Guild: message.guild.id, Command: cmd });
            if(data) message.channel.send(data.Response)
            
            if (command) {
                if (command.primeOnly == true && !premium) return message.reply("`[❌]` This command is premium only!")
                //cooldown stuff
                if(command.timeout) {
                    if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Woah chill out, you are on \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                    command.run(client, message, args)
                    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                    setTimeout(() => {
                        Timeout.delete(`${command.name}${message.author.id}`)
                    }, command.timeout)
                }
            }
        }else{
            let server = `[Server](${invite})`;

            message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle(`You have been blacklisted from using **${client.user.tag}**`)
            .addField('Reason', `\`\`\`${data.reason}\`\`\``)
            .setDescription('If you would like to get whitelisted you can join the support ' + server)
            )
        }
})
})

client.on('guildDelete', async(guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if(!data) return;
    if (err) throw err;
    if (data) {
      prefixSchema.findOneAndDelete({ Guild : guild.id })
    }
})
})

client.on('guildDelete', async(guild) => {
  schema.findOne({ Guild: guild.id }, async (err, data) => {
    if(!data) return;
    if (err) throw err;
    if (data) {
      schema.findOneAndDelete({ Guild : guild.id })
    }
})
})

client.on('guildDelete', async(guild) => {
  antiPing.findOne({ Guild: guild.id }, async (err, data) => {
    if(!data) return;
    if (err) throw err;
    if (data) {
      antiPing.findOneAndDelete({ Guild : guild.id })
    }
})
})