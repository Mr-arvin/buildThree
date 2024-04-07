<template>
  <div class="example">
    <div class="msg">{{ msg }}</div>
    <img src="./images/logo.png" />
    <img :src="imgSrc" />
  </div>
</template>
  
  <script>
import Logo from "./images/logo.png";
import "./styles/app.less";

export default {
  data() {
    return {
      msg: "Hello world!单独的",
      imgSrc: Logo,
    };
  },
};
</script>
  
  <style lang="less">
.example {
  color: red;
  img {
    border: 2px solid #000;
  }
}
</style>