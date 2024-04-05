const path = require("path"); // 导入Node.js的path模块，用于处理文件路径
const { merge } = require("webpack-merge"); // 导入webpack-merge模块，用于合并配置对象
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.common"); // 导入公共配置文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(
  {
    mode: "production", // 设置Webpack的构建模式为"production"
    output: {
      filename: "js/[name]_[contenthash].js", // 设置输出文件的名称，包含入口和内容hash的部分
      chunkFilename: "js/[name]_[contenthash].chunk.js", // 设置拆分的代码块（chunk）的文件名
      path: path.resolve(__dirname, "../dist"),
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            // loader解析的顺序是从下到上，从右到左的顺序
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  namedExport: true,
                  localIdentName: "[local]",
                },
              },
            },
            "less-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // //与webpackOptions.output中相同的选项类似
        //两个选项都是可选的
        filename: "css/[name]_[contenthash].css",
        chunkFilename: "css/[name]_[contenthash].chunk.css",
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          exclude: /\/excludes/,
          terserOptions: {
            mangle: true,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
        }),
        // OptimizeCSSAssetsPlugin(),
      ],
    },
  },
  base // 合并基础配置对象base
);
