const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    'slideshow': [
      path.resolve(__dirname, 'src/demo/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'demo'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor-manifest.json"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
