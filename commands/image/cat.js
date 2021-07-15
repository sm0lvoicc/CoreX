const { get } = require("snekfetch");

module.exports = {
        name: "cat",
        usage: "cat",
    timeout: 3000,
        aliases: ["meow", "cats"],
        description: "Get an image of a random cat",
       userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        let msg = await message.channel.send(". . . Generating . . .");

        get("https://aws.random.cat/meow").then(async res => { 
            await message.channel.send({ 
                files: [{
                    attachment: res.body.file,
                    name: "cat.png"
                }]
            }).then(msg.delete()); 
        });
    }
}
