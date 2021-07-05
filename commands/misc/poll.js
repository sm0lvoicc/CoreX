module.exports = {
    name: 'poll',
    timeout: 1000,
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
				messageReaction.react('👍'), messageReaction.react('👎')
			})
		message.delete()
    }
}