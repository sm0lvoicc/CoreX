const Discord = require("discord.js")

module.exports = {
    name: "profile",
    description: "",
    timeout: 5000,
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        if("floppa" === args[0].toLowerCase()) {
            const floppaembed = new Discord.MessageEmbed()
            .setImage("https://discord.c99.nl/widget/theme-4/582012181638414357.png")
            .setColor(`RANDOM`)
            message.channel.send(floppaembed)
        }
        if("tag" === args[0].toLowerCase()) {
            const tagembed = new Discord.MessageEmbed()
            .setImage("https://discord.c99.nl/widget/theme-4/538668078012039168.png")
            .setColor(`RANDOM`)
            message.channel.send(tagembed)
        }
        if("jake" === args[0].toLowerCase()) {
            const jakeembed = new Discord.MessageEmbed()
            .setImage("https://discord.c99.nl/widget/theme-4/708635694154776657.png")
            .setColor(`RANDOM`)
            message.channel.send(jakeembed)
        }

    }
}