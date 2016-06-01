"use strict";

const fs = require('fs');
const path = require('path');
const uuid = require('uuid4');
const nJwt = require('njwt');
const signinKey = uuid();

module.exports = {

	createTextDocument: function(userPath, url_slug, content, res) {
		fs.writeFile(path.join(userPath, url_slug), content, 'utf-8', function(err){
			if (err) {
				console.log(err)
			}
			else {
				res.status(200).send({text:content});
			}
		});
	},

	createToken: function(username, req, res) {
		const claims = {
			sub:username,
			iss:"swigit.com"
		}
		const jwt = nJwt.create(claims,signinKey);
		const token = jwt.compact();
		res.status(200).send(token);
	},

	signinKey:signinKey

}
