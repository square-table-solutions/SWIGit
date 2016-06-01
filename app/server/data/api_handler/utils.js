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

		if (username.toLowerCase() === "swigit-admin") {
			res.status(400).json({message:"You can't have that name"});
			return;
		}

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
					console.log(username," profile created");
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
				res.redirect('/signin');
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
		const url_slug = req.body.url_slug;
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
					url_slug:url_slug,
					excerpt:content.slice(0, 300) + "..."
					})
					.save()
					.then(function(blogPost) {
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
		const url_slug = req.body.url_slug;
		const userPath = path.join(__dirname, '../blog_posts', username);

		new User({username:username})
		.fetch()
		.then(function(user) {
			user.where({'id': user.id})
			.fetch({withRelated:['posts']})
			.then(function(user) {
				const obj = {
					fullname:user.attributes.fullname,
					feed:[]
				}
				const PostModels = user.related('posts').models;
				for(let i = 0; i < PostModels.length; i++) {
					obj.feed.push({
						fullname:user.attributes.fullname,
						username:user.attributes.username,
						title:PostModels[i].attributes.title,
						created_at:PostModels[i].attributes.created_at,
						url_slug:PostModels[i].attributes.url_slug,
						excerpt:PostModels[i].attributes.excerpt
					});
				}
				return obj;
			})
			.then(function(data) {
				res.status(200).send(data)
			})
		});

	},

	fetch_entire_post: function(req, res) {
		const username = req.body.username;
		const url_slug = req.body.url_slug;
		const userPath = path.join(__dirname, '../blog_posts', username);

		fs.readFile(path.join(userPath, url_slug), 'utf-8', function(err, data){
			if(err) {
				console.log("Error received ",err)
			}
			else {
				res.status(200).send({text:data});
			}
		})

	},

	delete_post: function(req, res) {
		const username = req.body.username;
		const url_slug = req.body.url_slug;
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
				fs.unlink(path.join(userPath, url_slug), function(){
					res.status(200).json({message:"post deleted"});
				});
			});
		});

	}

};
