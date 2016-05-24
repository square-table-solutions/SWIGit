"use strict";

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('../models/Post.js');
const User = require('../models/User.js');


module.exports = {

	createUserProfile: function(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		const fullname = req.body.fullname;
		const email = req.body.email;
		const user = new User({
			username:username,
			password:password,
			fullname:fullname,
			email:email
		}).save()
		.then(function(data) {
			console.log("User saved");
			fs.mkdir(path.join(__dirname,'../blog_posts/',username));
		})
		.catch(function(err) {
			console.log(err)
		})
		.then(function(){
			res.sendStatus(200);
		})
	},

	publish: function(req,res) {
		const username = req.body.username;
		const title = req.body.title;
		const content = req.body.content;
		let user_id;
		const userPath = path.join(__dirname,'../blog_posts', username);
		new User({
			username:username
		})
		.fetch()
		.then(function(user){
			if(user) {
				user_id = user.id;
				console.log("user ID ",user_id);
				let post = new Post({
					user_id_fk:user_id,
					title:title,
					filepath:path.join(userPath, title + '.txt')
				}).save()
				.then(function() {
					console.log(user_id);
				})
			}
		})
		.catch(function(err) {
			console.log("Error received: ", err);
		})

		fs.writeFile(path.join(userPath, title + '.txt'), content, 'utf-8', function(err){
			if (err) {
				console.log(err)
			}
			else {
				res.sendStatus(200);
			}
		});
	},

	fetch_posts: function(req,res) {
		const username = req.body.username;
		const userPath = path.join(__dirname, '../blog_posts', username);
		const results = []
		fs.readdir(userPath, function(err, files) { 

		})
		res.send(200, results);


	}


};
	


//