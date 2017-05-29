const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    vendor: [path.join(__dirname, "src", "vendor.js")]
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].dll.js",
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dll", "[name]-manifest.json"),
      name: "[name]",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
};