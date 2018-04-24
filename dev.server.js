var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
//var apiMocker = require('connect-api-mocker');

var host = '127.0.0.1';
var port = 3002;

new WebpackDevServer(webpack(config), {
  hot: true,
  debug: true,
  watch: true,
  stats: { colors: true },
  historyApiFallback: true,
  // setup: function(app) {
  //   app.use('api', apiMocker('mocks/api'));
  // }
  // proxy: {
  //   "/api": "http://localhost:3000"
  // }
}).listen(port, host, function listen(err) {
  if (err) {
    console.log(err);
  }
});


// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// server.use(jsonServer.rewriter({
//   "/api/*": "/$1",
// }))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})