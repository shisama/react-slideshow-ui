const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const deps = Object.keys(pkg.dependencies);
deps.push('react-dom');

module.exports = {
  mode: 'production',
  entry: {
    vendor: deps
  },
  output: {
    path: path.join(__dirname, 'demo'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};