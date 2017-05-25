import path from "path";
import webpack from "webpack";

export default {
  entry: path.resolve(__dirname, "src/components/SlideShow.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
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
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}