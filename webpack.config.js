const path = require('path');
const webpack = require('webpack');

module.exports = {
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
  devServer: {
    contentBase: 'demo/',
    historyApiFallback: true,
    port: 3355,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor-manifest.json"),
    }),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
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
