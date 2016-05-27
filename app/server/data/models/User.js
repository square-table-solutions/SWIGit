"use strict"
var db = require('../data_config.js');//need dependencies for database, bcrypt or other password generating/decoding middleware
var Post = require('./Post.js')
const User = db.Model.extend({
	tableName: 'users',

	posts: function() {
		return this.hasMany(Post)
	}
	
	//password creation and authentication to be created with passport

});



module.exports = User;