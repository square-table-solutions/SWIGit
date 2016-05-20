const app = require('./server/server_config');

const port = process.env.PORT || 3333;

const User = require('./server/data/models/User.js');

const Post = require('./server/data/models/Post.js');

app.listen(port);

console.log('Server listening on port:',port);