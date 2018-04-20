var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var apiMocker = require('connect-api-mocker');

var host = '127.0.0.1';
var port = 3002;

new WebpackDevServer(webpack(config), {
  hot: true,
  debug: true,
  watch: true,
  stats: { colors: true },
  historyApiFallback: true,
  setup: function(app) {
    app.use('/api', apiMocker('mocks/api'));
  }
}).listen(port, host, function listen(err) {
  if (err) {
    console.log(err);
  }
});
