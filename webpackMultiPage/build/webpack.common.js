const path = require("path"); // 导入Node.js的path模块，用于处理文件路径
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 导入HtmlWebpackPlugin模块，用于生成HTML文件
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js", // 设置入口文件为src目录下的index.js
    movie: "./src/movie.js",
  },
  // output: {
  //   path: path.resolve(__dirname, "../dist"), // 设置输出路径为dist目录
  // },
  module: {
    rules: [
      // 设置模块的解析规则
      {
        test: /\.jsx?$/, // 使用正则表达式匹配以.js或.jsx为后缀的文件
        exclude: /node_modules/, // 排除node_modules目录下的文件
        include: path.resolve(__dirname, "../src"), // 只在src目录下进行loader编译
        use: ["babel-loader"], // 使用babel-loader对符合条件的文件进行转译
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]?[hash]",
            outputPath: "images/",
            limit: 4096,
          },
        },
      },
      // 引入字体，svg等文件
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 设置HTML模板文件的路径
      title: "webpack single page",
      // chunks: ["vender", "main"],
      filename: "index.html", // 生成的HTML文件名称
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/movie.html"), // 设置HTML模板文件的路径
      title: "webpack multi page of movie",
      chunks: ["vender", "main"],
      filename: "movie.html", // 生成的HTML文件名称
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助 ServiceWorkers 快速启用
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    usedExports: false, // 是否启用 Tree Shaking 功能，剔除未使用的代码
    splitChunks: {
      chunks: "all",
      // chunks: "async", // async表示只对异步代码进行分割
      minSize: 3000, // 当超过指定大小时做代码分割
      maxSize: 20000, // 当大于最大尺寸时对代码进行二次分割
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "_",
      cacheGroups: {
        // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重越大，打包优先级越高
          // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
          name: "vender",
        },
        default: {
          minChunks: 2,
          priority: -20,
          name: "common",
          // filename: 'js/common.js',
          reuseExistingChunk: true, // 是否复用已经打包过的代码
        },
      },
    },
  },
};
