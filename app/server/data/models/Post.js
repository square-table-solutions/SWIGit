"use strict"

const db = require('../data_config.js');

const Post = db.Model.extend({
	tableName: 'posts',

	hasTimeStamps: true




	//url_slug: this.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/<[^>]+>/gm, '') : '',

});

module.exports = Post;


