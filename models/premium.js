const { model, Schema } = require('mongoose');

module.exports = model(
	'prime-servers',
	new Schema({
		Guild: String,
	})
);