const client = require('../index')
const RoleSchema = require('../models/autorole')

client.on('guildMemberAdd', async member => {
    RoleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data) {
			const role = member.guild.roles.cache.find(role => role.id == data.Role);
			if (!role) return;
			member.roles.add(role.id);
		}
	})
})

client.on('guildDelete', async(guild) => {
	RoleSchema.findOne({ Guild: guild.id }, async (err, data) => {
	if(!data) return;
	  if (err) throw err;
	  if (data) {
		RoleSchema.findOneAndDelete({ Guild : guild.id })
	}
})
})
