// filepath module for gulpfile.js

const join = (...args) => [].concat(...args);

const dest = {
  js: 'app/public/build/js',
  css: 'app/public/build/css'
};

const server = {
  all: {
    js: 'app/server/**/*.js'
  }
};

const client = {
  deps: {
    js: [
      'app/public/libs/angular-ui-router/release/angular-ui-router.js',
      'app/public/libs/angular-materialize/src/angular-materialize.js'
    ],
    css: [
      'app/public/libs/materialize/bin/materialize.css',
      'app/public/libs/prism/themes/prism-twilight.css'
    ]
  },
  dist: {
    js: ['app/public/js/**/*.js'],
    css:['app/public/css/**/*.css']
  },
  all: {
    js: () => [].concat(client.js_deps,client.ng_deps,client.dist.js)
  }
};

module.exports = {
  join: join,
  dest: dest,
  server: server,
  client: client
};


// paths for ALL dependencies, currently hosted on CDN
// js_deps: [
//   'app/public/libs/jquery/dist/jquery.js',
//   'app/public/libs/materialize/bin/materialize.js',
//   'app/public/libs/prism/prism.js'
// ],
// ng_deps: [
//   'app/public/libs/angular/angular.js',
//   'app/public/libs/angular-ui-router/release/angular-ui-router.js',
//   'app/public/libs/angular-animate/angular-animate.js',
//   'app/public/libs/angular-materialize/src/angular-materialize.js'
// ],