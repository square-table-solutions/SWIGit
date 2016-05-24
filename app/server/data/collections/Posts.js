
var db = require('../data_config');
var User = require('../models/Post.js');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;