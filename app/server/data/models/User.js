"use strict"
var db = require(../data_config.js);//need dependencies for database, bcrypt or other password generating/decoding middleware

const User = db.Model.extend({
	tablename: 'users',
	
	//password creation and authentication to be created with passport

});



model.exports = User;