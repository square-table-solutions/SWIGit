"use strict";

const fs = require('fs');
const path = require('path');

module.exports = {

	retrievePostsText: function(filenames, res, username, userPath) {
		let results = [];
		return Promise.all(filenames.map(function(file) {
			fs.readFile(path.join(userPath, file), 'utf-8', function(err, data) {
				if (err) {
					console.error(err);
				}
				results.push({title:file,content:data});
				if (results.length === filenames.length) {
					res.status(200).send({username:username, posts:results});
				}
			});
		}))
	},

	createTextDocument: function(userPath, url_slug, content, res) {
		fs.writeFile(path.join(userPath, url_slug), content, 'utf-8', function(err){
			if (err) {
				console.log(err)
			}
			else {
				res.sendStatus(200);
			}
		});	
	}

}