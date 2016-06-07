"use strict";

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const SubUtils = require('./subutils/subutils.js');


module.exports = {

	signup: function(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		const fullname = req.body.fullname;
		const email = req.body.email;

		new User({username:username})
		.fetch()
		.then(function(user) {
			if(!user) {
				new User({
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
					SubUtils.createToken(username, req, res);
				})
			}
			else {
				res.json({message:"Username is taken"});
			}
		})
	},

	signon: function(req, res) {

		const username = req.body.username;
		const password = req.body.password;

		new User({username:username})
		.fetch()
		.then(function(user) {
			if (!user) {
				res.redirect('/');
			}
			else {
				user.comparePassword(password, function(isMatch) {
					if (!isMatch) {
						res.status(401).send("Password Incorrect");
					}
					else {
						SubUtils.createToken(username, req, res);
					}
				});
			}
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
					.then(function() {
						SubUtils.createTextDocument(userPath, url_slug, content, res);
					});
				}
				else {
					fs.unlink(path.join(userPath, url_slug), function() {
						SubUtils.createTextDocument(userPath, url_slug, content, res);
					});
				}
			})
			.catch(function(err) {
				console.log("Error received: ",err);
			});
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
			const spaghetti = user.related('posts');
				//access to stored posts db entries here
		});

		fs.readdir(userPath, function(err, files) {
			SubUtils.retrievePostsText(files, res, username, userPath)
		});

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
