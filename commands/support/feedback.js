const {Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'feedback',
    description: 'Sends bug report to the developers.',
    usage: '<text>',
    timeout: 1000,
    run: async(client, message, args) => {

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Bug Report')
        .setDescription("Are you sure you want to report a bug?(Yes/No)")

        var botmsg = await message.channel.send(embed)

        answer = await message.channel.awaitMessages(answer=>answer.author.id===message.author.id,{max: 1});
        agree = (answer.map(answers=>answers.content)).join()
        await answer.map(answer=>answer.delete())
        if(agree.toLowerCase() != "yes") return botmsg.edit("The process has been terminated");

        embededit(botmsg,"Please Describe the bug")
        answer1 = await message.channel.awaitMessages(answer=>answer.author.id===message.author.id,{max: 1});
        reply = (answer1.map(answers=>answers.content)).join()

        await answer1.map(answer=>answer.delete())

        embededit(botmsg,"Thank you for reporting"+`\n`+`Your Report: ${reply}`)

        const embed1 = new MessageEmbed()
        .setTitle('New Bug Report')
        .addField(`Author:`, `${message.author.tag} (\`${message.author.id}\`)`)
        .addField('From:', `${message.guild.name} (\`${message.guild.id}\`)`)
        .addField('Bug:', reply)
        .setColor('RED')
        
        let channel = client.channels.cache.get('837501380682842122');
        channel.send(embed1)
    }
}

function embededit(botmsg,info){
    const embed = new MessageEmbed()
            .setTitle('Bug Report')
            .setDescription(`${info}`)
            .setColor('BLUE')

        botmsg.edit(embed);
}