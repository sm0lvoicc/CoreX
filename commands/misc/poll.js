const emoji = require('../../emoji.json')

module.exports = {
    name: 'poll',
    timeout: 1000,
	description: 'Make a poll.',
	userPerms: ['MANAGE_MESSAGES'],
	clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {
        let msgArgs = args.join(' ')

		if (!args[0]) {
			return message.channel.send(
				'Please tell me what you would like the poll to ask!'
			)
		}

		message.channel
			.send(`**${msgArgs}${msgArgs.endsWith('?') ? '' : '?'}**`)
			.then((messageReaction) => {
				messageReaction.react(emoji.success), messageReaction.react(emoji.error)
			})
		message.delete()
    }
}