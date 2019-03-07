<template>
  <div v-if="isShow" id="shopConfigFirst" ref="shopConfigFirst">
    <config-header
      :headerText="headerText"
      :selectProductsNum="$store.state.shop.ProducData.selectNum"
      :allProductsNum="$store.state.shop.ProducData.allNum"
      :showInput="false"
    ></config-header>
    <div class="config-content">
      <div class="fl content-fl">
        <ul>
          <li v-for="(fruit, index) in goodsList" :key="index">
            <p :title="fruit.productName">{{fruit.productName}}</p>
            <div>
              <img :src="fruit.productImgUrl" alt>
              <div class="input-price">
                <input
                  type="number"
                  maxlength="10"
                  placeholder="输入人民币价格（￥）"
                  @keydown="handleInput"
                  @blur="checkNum(fruit.goodsPrice)"
                  v-model="fruit.goodsPrice"
                >
                <div class="view-price">
                  <span>{{fruit.goodsPrice*100}}</span>
                  <span class="icon-gold"></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="config-btn" @click="goFirstStep">上一步</div>
    <div class="config-btn confirm" @click="goThirdStep">下一步</div>
  </div>
</template>
<script>
import configHeader from "~/components/shop/configHeader";
export default {
  props: {
    isShow: Boolean,
    goodsList: Array
  },
  components: {
    configHeader
  },
  data() {
    return {
      headerText: "2:调整商品价格",
      productPrice: 0,
      isClick:false
    };
  },
  methods: {
    handleInput(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    },
    goFirstStep() {
      this.goodsList.forEach(element => {
          element.goodsPrice = element.goodsPrice*100
      });
      this.$emit("stepGo", { data: this.goodsList, step: 1 });
    },
    goThirdStep() {
      this.goodsList.forEach(element => {
          element.goodsPrice = element.goodsPrice*100
      });
      if(this.isClick){
        this.$emit("stepGo", { data: this.goodsList, step: 3 });
      }else{
        maskCom({
          txt:['请检查商品信信是否填写正确']
        })
      }
    },
    checkNum(val){
      if(val == undefined || val<=0 || val>= 200){
        maskCom({
          txt:['只能输入0-200元人民币等值的商品']
        })
        this.isClick =false
      }else{
        this.isClick = true
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/shop/config.scss";

.main-content .config-content .content-fl ul li {
  background: transparent;
  height: 154px;
  margin-right: 13px;
  > p {
    max-width: 100%;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > div {
    position: relative;
    > img {
      margin-top: 5px;
      opacity: 0.2;
    }
    > .input-price {
      width: 128px;
      position: absolute;
      left: calc(50% - 64px);
      bottom: 20px;
      > input {
        width: 92px;
        height: 24px;
        background: rgba(0, 0, 0, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 12px;
        color: #d2d2d2;
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
      }
      .view-price {
        line-height: 12px;
        margin: 11px 0 7px;
        vertical-align: middle;
        > span {
          color: #ffcc00;
        }
        .icon-gold {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
</style>


