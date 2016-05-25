
var db = require('../data_config');
var Post = require('../models/Post.js');

var Posts = new db.Collection();

Posts.model = User;

module.exports = Posts;