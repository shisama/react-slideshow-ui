const path = require('path');
const webpack = require('webpack');

const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
];

module.exports = {
  entry: {
    'slideshow': process.env.NODE_ENV === 'production' ? [
      'flow-remove-types',
      path.resolve(__dirname, 'src/index.js'),
    ]
    : [
      path.resolve(__dirname, 'src/demo/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: process.env.NODE_ENV === 'production' ? path.resolve(__dirname,
      'public')
      : path.resolve(__dirname, 'demo'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'demo/',
    historyApiFallback: true,
    port: 3355,
    hot: true,
  },
  plugins: process.env.NODE_ENV === 'production' ? PLUGINS : PLUGINS.concat([
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor-manifest.json"),
    })
  ]),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
