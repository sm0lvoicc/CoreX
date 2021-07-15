const urban = require("urban");
const { prefix } = require("../../config.json") 

module.exports = {
        name: "urban",
        aliases: ["define", "see", "lookup"],
        timeout: 3000,
        usage: "urban <thing to lookup>",
        description: "Look something up on the urban dictionary",
       userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        var targetWord = args == "" ? urban.random() : urban(args);
        let cmd = message.content.split(" ")[0].replace(prefix, '');
		targetWord.first(function(json) {
			if (json) {
				var tosend = "Urban Dictionary: **" +json.word + "**\n\n" + json.definition;
				if (json.example) {
					tosend = tosend + "\n\n__Example__:\n" + json.example;
                }
				message.channel.send(tosend);
            } else {
				message.channel.send("No matches found");
            }
        });
    }
}
