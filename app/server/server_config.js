"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jwt = require('jwt-simple');


const route = require('./route/route_config');
const verify = require('./verify/validate');


const app = express();

app.use(express.static(route.path.root));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post('/_api/auth/signon', route.utils.signon);
app.post('/_api/auth/signup', route.utils.signup);

app.post('/_api/auth', route.utils.signup);

app.get('/*', route.serve.index);

app.post('/_api/post', verify.validateToken, route.utils.publish);

app.post('/_api/posts', route.utils.fetch_posts);


app.delete('/_api/delete_post', verify.validateToken, route.utils.delete_post);

app.post('/_api/posts/content', route.utils.fetch_entire_post);


app.post('/dash/*', verify.validateToken);

app.get('/*', route.serve.index);

module.exports = app;
