module.exports = (client, message, queue, track) => {
    message.channel.send(
        `Added ${track.title} - \`${track.duration}\` to the queue by ${track.requestedBy}`,
      )
};