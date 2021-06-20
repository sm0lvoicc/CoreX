const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Gives an answer to a provided question.',
    timeout: 4000,
    run: async(client, message, args) => {
        if(!args[1]) return message.reply("Plesae enter a full question with 2 or more words!");
        let replies = [
            "Yes", 
            "No", 
            "I don't know", 
            "Ask again later!", 
            "Maybe", 
            "O.O", 
            "Yeah absolutely", 
            "Why are you asking?", 
            "You will make me go offline", 
            "I am not sure!", 
            "Pls No", 
            "You tell me", 
            "Without a doubt", 
            "Cannot predict now", 
            "Without a doubt", 
            "For sure", 
            "No Way!",
            "Hell Nah!",
            "Possibly",
            "Indeed",
            "Most Likely",
            "My ping is high, please repeat that!",
            "Do you think so? Cuz I surely don't ",
            "Hmm this is a hard one",
            "T-T",
            "I think there might be a small chance",
            "I also don't have an answer for this question",
            "Kinda weird",
            "._. Bruh Moment",
            "Lmfaoooo, this is the most dumbest question ever",
            "Get some help",
            "I shall ask my developers",
            "Searching in the console.... 💻",
            "Go to sleep",
        ];
    
        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");
    
        let ballembed = new MessageEmbed()
    
        .setColor('RANDOM')
        .setTitle('🎱8ball Machine!')
        .addField(`Question from ${message.author.username}`, question)
        .addField("Answer from CoreX ", replies[result])
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(
            `CoreX shall guess!`,
            client.user.displayAvatarURL({ dynamic: true })
          )
    
        message.channel.send(ballembed)
    
    }
}