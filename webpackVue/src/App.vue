<template>
  <div class="example">
    <div class="msg">{{ msg }}</div>
    <img src="./images/logo.png" />
    <img :src="imgSrc" />
    {{ color }}
    <Home />
  </div>
</template>
  
  <script>
import Logo from "./images/logo.png";
import Home from "./../src/pages/Home.vue";
import "./styles/app.less";

export default {
  components: {
    Home,
  },
  data() {
    return {
      msg: "Hello world!单独的",
      imgSrc: Logo,
      color: "灰色",
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