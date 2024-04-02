const path = require("path");
const config = require("./webpack.config");
const { merge } = require("webpack-merge");

const devConfig = {
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "..", "dist"),
  },
  devServer: {
    host: "localhost",
    port: 8080,
  },
};

module.exports = merge(devConfig, config);
