const nJwt = require('njwt');

const secretOrKey = require('../data/api_handler/subutils/subutils.js');

module.exports = {

  validateToken:function(req, res, next) {
    var token = req.headers['x-access-token'];
    nJwt.verify(token, secretOrKey.signinKey, function(err,token) {
      if (err) {
        console.log("Authentication Error: ",err);
        res.status(400).json({message:"You don't have permission to do that"});
      }
      else {
        next();
      }
    });
  }
};
