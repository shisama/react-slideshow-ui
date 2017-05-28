import path from 'path';
import webpack from 'webpack';

const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
];

export default {
  entry: process.env.NODE_ENV === 'production' ?
    [
      'flow-remove-types',
      path.resolve(__dirname, 'src/index.js'),
    ]
    : [
      path.resolve(__dirname, 'src/demo.js')
    ],
  output: {
    filename: 'slideshow.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 3355,
    hot: true
  },
  plugins:
    process.env.NODE_ENV === 'production' ?
    PLUGINS.concat([
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        compressor: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ])
    : PLUGINS,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}