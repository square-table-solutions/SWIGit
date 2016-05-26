"use strict";

const app = require('../server_config.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const User = require('../data/models/User.js');
const Post = require('../data/models/Post.js');
const Utils = require('../data/api_handler/utils.js');


exports.path = {
  root: path.join(__dirname, '../../public'),
  index: path.join(__dirname, '../../public/index.html')
};

exports.serve = {
  index: function(req,res,next) {
    fs.readFile(exports.path.index, 'utf-8', function(err,data) {
      if(!err)
        res.status(200).send(data);
      else
        res.redirect('/');
    });
  }
};

exports.utils = {
	login: function(req,res) {

	},

	signup: function(req,res) {
		Utils.createUserFolder(req, res);		
	},

	publish: function(req,res) {
		Utils.publish(req, res);
	}
}
=======
module.exports;
>>>>>>> b733c7bb7023db536af8d27a14b3b5efd43961ac

