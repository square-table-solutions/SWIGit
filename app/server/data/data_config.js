"use strict"; 
const path = require('path'); 
const db = require('knex')({
  client: 'sqlite3', 
  connection: {
    database: "swigitdb", 
    filname: path.join(__dirname, 'swigit.sqlite'); 
  }
}); 

db.schema.hasTable('users').then(function(exists){
  if (!exists){
    db.schema.createTable('users'), function(user){
      user.increments('id').primary(); 
      user.string('username', 32).unique(); 
      user.string('password'); 
      user.string('fullname', 32); 
      user.string('email').unique();
    }).then(function(table){
      console.log("Created users table"); 
    })
  }
});

db.schema.hasTable('posts').then(function(exists){
  if (!exists){
    db.scchema.createTable('posts'), function(post){
      post.increments('id').primary(); 
      post.string('title', 75); 
      post.string('filepath', 128); 
      post.string('url_slug', 75); 
      post.integer('user_id_fk'); 
      post.foreign('posts.user_id_fk').references('users.id');
    }).then(function(table){
      console.log("Created posts table"); 
    })
  }
}); 

const Bookshelf = require('bookshelf')(db); 
module.exports = Bookshelf; 