module.exports = (client, message, track, queue) => {
    const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.getFiltersEnabled().join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoPlay ? "On" : "Off"}\``;
    let duration = track.duration;
    if(duration === '0:00'){
      duration = 'LIVE'
    }
    message.channel.send(
        `Playing \`${track.title}\` - \`${
          duration
        }\`\nRequested by: ${track.requestedBy}\n${status(queue)}`,
      )
};