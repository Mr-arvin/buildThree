const path = require("path"); // 导入Node.js的path模块，用于处理文件路径
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 导入HtmlWebpackPlugin模块，用于生成HTML文件
const template = path.resolve(__dirname, "../public/index.html"); // 定义HTML模板文件的路径
const { VueLoaderPlugin } = require("vue-loader");
// console.log(VueLoaderPlugin);
// const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js", // 设置入口文件为src目录下的index.js
  },
  // output: {
  //   path: path.resolve(__dirname, "../dist"), // 设置输出路径为dist目录
  // },
  resolve: {
    extensions: [".js", ".vue", ".json"],
  },
  module: {
    rules: [
      // 设置模块的解析规则
      {
        test: /\.jsx?$/, // 使用正则表达式匹配以.js或.jsx为后缀的文件
        exclude: /node_modules/, // 排除node_modules目录下的文件
        include: path.resolve(__dirname, "../dist"), // 只在src目录下进行loader编译
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
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template, // 设置HTML模板文件的路径
      title: "webpack single page",
      chunks: ["vender", "main"],
      filename: "index.html", // 生成的HTML文件名称
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助 ServiceWorkers 快速启用
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new VueLoaderPlugin(),
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

/**
在这个配置文件中，index.js和index.html之间的关联是通过HtmlWebpackPlugin插件来实现的。

首先，在Webpack的入口配置中，指定了main: "./src/index.js"，将index.js作为项目的入口文件。

然后，在plugins属性中，使用HtmlWebpackPlugin插件创建了一个新的实例，并传入了相关配置项。其中，template配置项指定了HTML模板文件的路径，即template: path.resolve(__dirname, "../public/index.html")。这里使用了Node.js的path.resolve()方法将相对路径解析为绝对路径。

当使用HtmlWebpackPlugin插件时，它会读取指定的HTML模板文件，并根据配置生成一个新的HTML文件。插件将自动把打包生成的所有JavaScript文件（包括入口文件和所有依赖）以<script>标签形式插入到生成的HTML文件中。

最后，根据配置中的filename选项，生成的HTML文件被命名为index.html，并存储在Webpack的输出路径（output.path）下。

因此，通过配置HtmlWebpackPlugin插件，将index.js与index.html进行关联，确保在构建过程中自动生成包含正确引用的JavaScript脚本的HTML文件。
 */
