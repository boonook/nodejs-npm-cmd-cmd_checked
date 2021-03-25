<template>
  <div class="svga">
    <div class="svga-content">
      <img src="../../images/svgabg.png" mode="widthFix" style="width:100%" alt="">
      <div class="intro">
        <canvas type="2d" style="width:100%; height:100%;" id="myCanvas"></canvas>
      </div>
      <view class="title">
        <img src="../../images/bgHeader.png" style="width:100%" mode="widthFix" alt=""/>
      </view>
    </div>
  </div>
</template>

<script>
  const SVGA = require("./svga.min.js");
  export default {
    name: "svga",
    props: {},
    components: {},
    data() {
      return {
        bgImg:'https://h5.133.cn/hangban/vue/promotionPic/cdn.133.cn/ticket/vue/promotion/doubleTwelve2020/doubleTwelve2020Header.svga',
        svgaStatus:false
      }
    },
    methods: {},
    onReady() {
      ////微信开发者工具上存在无法播放喝报错的情况，但是在真机上测试正常
      let player = new SVGA.Player("#myCanvas");
      let parser = new SVGA.Parser();
      parser.load(this.bgImg, function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
      })
    },
    watch: {},
    destroyed() {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .svga {
    min-height:100vh;
    background-color:orange;
    .svga-content{
      position: relative;
    }
    .intro{
      position: absolute;
      z-index:3;
      top:0;
      width:100%;
      height:100%;
    }
    .title{
      position: absolute;
      z-index:2;
      top:0;
      width:100%;
      height:100%;
    }
  }
</style>
