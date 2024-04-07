const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(
  {
    mode: "development",
    devServer: {
      host: "localhost",
      port: 8080,
      historyApiFallback: true,
      static: path.resolve(__dirname, "../public"),
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            // loader解析的顺序是从下到上，从右到左的顺序
            "style-loader", //使用MiniCssExtractPlugin时就不能使用style-loader了
            {
              loader: "css-loader",
              options: {
                importLoaders: 2, //该方式可以让@import引入的css文件再次执行一边css打包loader
              },
            },
            "postcss-loader",
            "less-loader",
          ], //loader的加载顺序是从下往上，从右往左的,这里如果postcss-loader和less-loader交换位置就会出一些奇怪都问题，如mixin不支持
        },
      ],
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  base
);
