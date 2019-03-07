<template>
  <div class="config-header">
    <div class="fl header-title">{{headerText}}</div>
    <div class="fl header-input hide" v-if="showInput">
      <input type="text" placeholder="输入名称">
      <div class="search-icon"></div>
    </div>
    <div class="fr header-tip">
      选中商品
      <span>{{selectProductsNum}}</span>
      /{{allProductsNum}}
    </div>
  </div>
</template>
<script>
import { getGoodsList } from "@/request/shopInfo";
export default {
  props: {
    headerText: String,
    selectProductsNum: Number,
    allProductsNum: Number,
    showInput: Boolean
  },
  methods: {
    async getGoodsList(paramett) {
      let res = await getGoodsList(paramett);
      res.goodsInfo.forEach(element => {
        element.state = false;
      });
      this.fruits = res.goodsInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
.fl {
  float: left;
}

.fr {
  float: right;
}

.config-header {
  width: 100%;
  height: 40px;
  background: rgba(34, 38, 48, 1);
  line-height: 40px;
  vertical-align: middle;
  padding: 0 270px 0 22px;

  .header-title {
    font-size: 18px;
  }

  .header-input {
    margin-left: 30px;
    position: relative;

    > input {
      width: 170px;
      height: 28px;
      background: rgba(50, 57, 65, 1);
      border: 1px solid rgba(87, 98, 114, 1);
      border-radius: 14px;
      text-indent: 33px;
    }

    .search-icon {
      z-index: 100;
      width: 13px;
      height: 13px;
      float: right;
      border: 1px solid #fff;
      border-radius: 50%;
      transition: all 0.1s ease-in-out;
      position: absolute;
      top: calc(50% - 7.5px);
      left: 9px;
      opacity: 0.7;

      &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        right: -3px;
        width: 1px;
        height: 6px;
        border-radius: 10px;
        background-color: #fff;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  }

  .header-tip {
    color: #fff;
    font-size: 16px;

    span {
      color: #fea700;
    }
  }
}
</style>


