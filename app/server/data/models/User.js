"use strict"
var db = require('../data_config.js');
var Post = require('./Post.js')
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

const User = db.Model.extend({
	tableName: 'users',

	posts: function() {
		return this.hasMany(Post)
	},

	initialize: function() {
		this.on('creating', this.hashPassword)
	},

	hashPassword: function() {
		var hashPassword = Promise.promisify(bcrypt.hash);
		return hashPassword(this.get('password'), null, null).bind(this)
		.then(function(hash) {
			this.set('password', hash);
			console.log("Inside hashPassword ", hash);
		});
	},

	comparePassword: function(attemptedPassword, callback) {
		bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
			callback(isMatch);
		});
	}

});



module.exports = User;
