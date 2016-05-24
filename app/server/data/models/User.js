"use strict"
var db = require('../data_config.js');//need dependencies for database, bcrypt or other password generating/decoding middleware

const User = db.Model.extend({
	tableName: 'users'
	
	//password creation and authentication to be created with passport

});



module.exports = User;