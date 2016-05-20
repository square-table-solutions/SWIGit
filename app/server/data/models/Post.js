"use strict"

const db = require(../config.js);

const Post = db.Model.extend({
	tablename: 'posts',

	hasTimeStamps: true,

	url_slug: this.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/<[^>]+>/gm, '') : ''


});

model.exports = Post;


