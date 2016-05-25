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
		})
		.save()
		.then(function(data) {
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
		const url_slug = title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/<[^>]+>/gm, '');
		const content = req.body.content;
		const userPath = path.join(__dirname,'../blog_posts', username);
		new User({
			username:username
		})
		.fetch()
		.then(function(user){
			if(user) {
				new Post({
					user_id:user.id,
					filepath:path.join(userPath, url_slug)
				})
				.fetch()
				.then(function(item){
					if(!item) {
						new Post({
						created_at:new Date(),
						user_id:user.id,
						title:title,
						filepath:path.join(userPath, url_slug),
						url_slug:url_slug
						})
						.save()
						.then(function(){
							fs.writeFile(path.join(userPath, url_slug), content, 'utf-8', function(err){
								if (err) {
									console.log(err)
								}
								else {
									res.sendStatus(200);
								}
							});
						});
					}
					else { 
						//update posts here
						//will need a fs update statement as well
						res.sendStatus(200);
					}
				})
				.catch(function(err) {
					console.log("Error received: ",err);
				});
			}
		})
		.catch(function(err) {
			console.log("Error received: ", err);
		});

	},

	fetch_posts: function(req,res) {
		const username = req.body.username;
		const user_id = req.body.user_id;
		const userPath = path.join(__dirname, '../blog_posts', username);

		User.where('id', user_id).fetch({withRelated: ['posts']})
		.then(function(user) {
			let spaghetti = user.related('posts');
			let meatballs = spaghetti.orderBy('created_at', 'ASC');
			for ( let i = 0; i < spaghetti.models.length; i++) {
				//access to stored posts db entries here
			}
		});

		let results = [];
		fs.readdir(userPath, function(err, files) { 
			retrievePostsText(files)
		});

		function retrievePostsText(filenames) {
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
		};
	},

	edit_post: function(req, res) {


	},

	delete_post: function(req, res) {
		const username = req.body.username;
		const url_slug = req.body.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/<[^>]+>/gm, '');
		const userPath = path.join(__dirname, '../blog_posts', username);

		new User({username:username})
		.fetch()
		.then(function(user) {
			Post.where({
				user_id:user.id,
				url_slug:url_slug
			})
			.destroy()
			.then(function() {
				fs.unlink(path.join(userPath, url_slug))
			});
		});

	}

};
	