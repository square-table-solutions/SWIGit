"use strict"; 
const path = require('path'); 
const db = require('knex')({
  client: 'sqlite3', 
  connection: {
    database: "swigitdb", 
    filename: path.join(__dirname, './db/swigit.sqlite') 
  },
  useNullAsDefault:true
}); 

db.schema.hasTable('users').then(function(exists){
  if (!exists){
    db.schema.createTable('users', function(user){
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
    db.schema.createTable('posts', function(post){
      post.increments('id').primary(); 
      post.string('title', 75); 
      post.string('filepath', 128); 
      post.string('url_slug', 75); 
      post.integer('user_id'); 
      post.timestamp('created_at'); 
      post.foreign('user_id').references('users.id'); 
    }).then(function(table){
      console.log("Created posts table"); 
    })
  }
}); 

db.schema.hasTable('tags').then(function(exists){
  if (!exists) {
    db.schema.createTable('tags', function(tag){
      tag.increments('id').primary(); 
      tag.string('name', 50).unique(); 
    }).then(function(table){
      console.log("Created tags table"); 
    })
  }
});

db.schema.hasTable('posts_tags').then(function(exists){
  if (!exists){
    db.schema.createTable('posts_tags', function(post_tag){
      post_tag.increments('id').primary(); 
      post_tag.integer('post_id_fk'); 
      post_tag.integer('tag_id_fk'); 
      post_tag.foreign('post_id_fk').references('posts.id'); 
      post_tag.foreign('tag_id_fk').references('tags.id'); 
    }).then(function(table){
      console.log("Created posts/tags join table"); 
    }) 
  }
});

const Bookshelf = require('bookshelf')(db); 
module.exports = Bookshelf; 