"use strict"

const db = require('../data_config.js');

const Post = db.Model.extend({
	tableName: 'posts',

	hasTimeStamps: true,

	user: function() {
		return this.belongsTo(User, this.user_id);
	}

});

module.exports = Post;
