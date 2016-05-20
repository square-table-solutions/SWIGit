const fs = require('fs');
const path = require('path');

const User = require('../data/models/User.js');
const Post = require('../data/models/Post.js');

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

module.exports;