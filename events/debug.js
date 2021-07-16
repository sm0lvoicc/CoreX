const client = require('../index')

client.on('debug', async (debug) => {
    console.log(`client => ${debug}`)
})