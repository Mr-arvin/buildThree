import $ from "jquery";
import "./styles/app.less";
$("#root .content").html("hello world2");
let name = "xuxi";
let say = (name) => {
  console.log(name);
};
say(name);
