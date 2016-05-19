var app = require('./server/server_config');

var port = process.env.PORT || 3333;

app.listen(port);

console.log('Server listening on port:',port);