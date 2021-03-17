/** @format */

var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: 'development', // mode: "development || "production",
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    lib: ['react', 'react-dom', 'mobx', 'mobx-react']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: 'lib'
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      context: __dirname,
      name: '[name]'
    })
  ]
};
