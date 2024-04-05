import $ from "jquery";
import "./styles/app.less";
$("#root .content").html("hello world2");
let name = "xuxi";
let say = (name) => {
  console.log(name);
};
say(name);

/*
pwa：渐进式网络应用程序(progressive web application - PWA)，是一种可以提供类似于native app(原生应用程序) 体验的 web app(网络应用程序)。首先我们安装依赖：

npm install workbox-webpack-plugin --save-dev

注册ServiceWorker并且需要处理兼容性问题
*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // service-worker.js是WorkboxWebpackPlugin生产的配置文件
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("serviceWorker注册成功");
      })
      .catch(() => {
        console.log("serviceWorker注册失败");
      });
  });
}
