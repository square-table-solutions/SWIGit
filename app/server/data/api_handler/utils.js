"use strict";

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const SubUtils = require('./subutils/subutils.js');


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
			let spaghetti = user.related('posts');
			let meatballs = spaghetti.orderBy('created_at', 'ASC');
			for ( let i = 0; i < spaghetti.models.length; i++) {
				//access to stored posts db entries here
			}
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
	