const redis = require("redis");
const { redisPath } = require("./config.json");

modules.exports = async () => {
  return await new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: redisPath,
    });

    client.on("error", (err) => {
      console.error(`Redis error: ${err}`);
      client.quit();
      reject(err);
    });

    client.on("ready", () => {
      resolve(client);
    });
  });
};
