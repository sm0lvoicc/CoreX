const Discord = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "sandbox",
  timeout: 5000,
  description: "Evaluate a piece of code!",
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has("862058803344048148"))
      return message.lineReply(
        "This command is only allowed to `Contributors` for now, it may soon be available to everyone after being tested",
      );
    if (!args[0])
      return message.channel.send(
        `${emoji.error} Please provide something to evaluate!`,
      );
    const evaled = (await evaluate(args.join(" "))) || "No response!";
    message.channel.send(evaled);
  },
};
async function evaluate(args) {
  if (args.includes("process")) return;
  if (args.includes("while")) return;
  if (args.includes("fs")) return;
  if (args.includes("this")) return;
  if (args.includes("console")) return;
  if (args.includes("eval")) return;
  if (args.includes("token"))
    if (args.split("for")[1]) {
      let result = true;
      args.split("for").forEach((arg) => {
        if (arg.startsWith("Each")) result = false;
      });
      if (result == true) return;
    }
  if (args.includes("require")) return;
  try {
    let evaled;

    if (args.includes("await")) {
      evaled = await eval(`(async () => { ${args} })();`);
    } else {
      evaled = eval(args);
    }
    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled, { depth: 0 });
    }
    return `\`\`\`xl\n${clean(evaled)}\n\`\`\``;
  } catch (err) {
    return `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``;
  }
}

function clean(text) {
  if (typeof text === "string") {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}
