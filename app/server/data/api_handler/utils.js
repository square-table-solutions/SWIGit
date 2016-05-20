"use strict";

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


module.exports = {

	createUserFolder: function(req, res) {
		const author = req.body.author;
		let blogPostsPath = path.join(__dirname,'../blog_posts/');
		fs.mkdir(path.join(blogPostsPath, author));

	},

	publish: function(req,res) {
		const author = req.body.author;
		const title = req.body.title;
		const text = req.body.text;
		const userPath = path.join(__dirname,'../blog_posts', author);
		fs.writeFile(path.join(userPath, title + '.txt'), text, 'utf-8', function(err){
			if (err) {
				console.log(err)
			}
			else {
				res.sendStatus(200);
			}
		});
	}



};
	


//