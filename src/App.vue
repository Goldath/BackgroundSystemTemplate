<template>
  <div id="app" @click="clicked">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lTime: new Date().getTime(), // 最后一次点击的时间
      ctTime: new Date().getTime(), //当前时间
      tOut: 60* 60 * 1000 //超时时间1小时无操作自动退出登录
    };
  },
  mounted() {
    window.setInterval(this.tTime, 6000); //一分钟运行一次
  },
  methods: {
    clicked() {
      this.lTime = new Date().getTime(); //当界面被点击更新点击时间
      sessionStorage.setItem("lTime", this.lTime);
    },
    tTime() {
      this.ctTime = new Date().getTime();
      let tempTiem = this.ctTime - this.lTime;
      if (tempTiem > this.tOut) {
        console.log("一小时自动退出");
        this.$logout();
        this.lTime = new Date().getTime();
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
/* 重置浏览器自带样式 */
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
@font-face {
  font-family: "iconfont"; /* project id 1555823 */
  src: url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.eot");
  src: url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.woff") format("woff"),
    url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1555823_ks1mtzzdqrs.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.mt15 {
  margin-top: 15px;
}
.mt20 {
  margin-top: 20px;
}
.mt25 {
  margin-top: 25px;
}
.mt30 {
  margin-top: 30px;
}
</style>
