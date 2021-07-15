const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
        name: "dog",
        description: "Sends a Random dog image!",
        aliases: ["woof", "bark", "doge"],
        timeout: 3000,
        usage: "dog",
        description: "Get a cute image of a dog",
        userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        let msg = await message.channel.send(". . . Generating . . .");

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`);
        if(!{body}) return message.channel.send("Unfortunately, an error occurred - try running the command again.");

        await message.channel.send({ 
            files: [{
                attachment: body.message,
                name: "dog.png"
            }]
        }).then(() => msg.delete()); 
    }
}
