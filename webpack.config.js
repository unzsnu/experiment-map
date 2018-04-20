var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var env = process.env.NODE_ENV;

var entries = ['whatwg-fetch', path.join(__dirname, 'src/App')];
var output = {
  filename: 'bundle.js',
  path: path.join(__dirname, 'dist')
};

// Add more files to copy to the dist folder (Eventually an assets folder)
var toCopy = [
  { from: 'index.html' },
  { from: 'Staticfile' },
  { from: 'favicons', to: 'favicons' },
  { from: 'mocks', to: 'mocks' }
];

var plugins = [
  new webpack.PrefetchPlugin('react'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'" + env + "'"
    }
  })
];

var devtool = '';

if (env === 'dev') {
  entries = entries.concat(['webpack-dev-server/client?http://localhost:3001']);
  output.path = __dirname;
  devtool = 'eval';
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  plugins = plugins.concat([
    new CopyWebpackPlugin(toCopy),
    new webpack.optimize.DedupePlugin()
  ]);
}
var query = {
  bypassOnDebug: true,
  optipng: {
    optimizationLevel: 7
  },
  gifsicle: {
    interlaced: false
  }
};
module.exports = {
  entry: entries,
  output: output,
  devtool: devtool,
  resolve: {
    extensions: ['', '.ts', '.js', '.tsx', '.css']
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?${JSON.stringify(query)}'
        ]
      }
    ]
  },
  plugins: plugins
};
