<template>
  <div class="guide-wrap">
    <Carousel v-model="value" :radius-dot="true" @on-change="change">
      <CarouselItem>
        <img src="@/assets/img/background/guide-1.png" alt>
      </CarouselItem>
      <CarouselItem>
        <img src="@/assets/img/background/guide-2.png" alt>
      </CarouselItem>
      <CarouselItem>
        <img src="@/assets/img/background/guide-3.png" alt>
        <div class="guideGoPage" @click="guideHide">立即进入</div>
      </CarouselItem>
    </Carousel>
    <div class="guideHide" @click="guideHide" v-if="value!=2">跳过介绍</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0
    };
  },
  methods: {
    guideHide() {
      this.$emit("guideHide");
    },
    change(oldValue, value) {
      this.value = value;
    }
  }
};
</script>
<style lang="scss">
@mixin btnDef {
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: #e4ecff;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  position: absolute;
}
.guide-wrap {
  // display: none;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  .ivu-carousel {
    width: 96%;
    height: 80%;
    position: absolute;
    left: 2%;
    top: 10%;
  }
  .ivu-carousel-arrow {
    width: 56px;
    height: 56px;
  }
  .ivu-icon-ios-arrow-back:before,
  .ivu-icon-ios-arrow-forward:before {
    font-size: 36px;
  }
  .ivu-carousel-track {
    height: 100vh;
  }
  .ivu-carousel-item {
    height: 100vh !important;
    position: relative;
    img {
      width: 340px;
      position: absolute;
      left: calc(50% - 170px);
      top: calc(50% - 288px);
    }
  }
  .guideGoPage {
    width: 192px;
    height: 56px;
    font-size: 20px;
    line-height: 56px;
    left: calc(50% - 96px);
    bottom: 250px;
    @include btnDef;
  }
  .guideHide {
    width: 124px;
    height: 36px;
    font-size: 16px;
    line-height: 36px;
    right: 40px;
    bottom: 40px;
    @include btnDef;
  }
}
</style>
