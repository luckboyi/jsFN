<template>
  <div>
    <div class="config-list" v-for="(item,index) in listDate" :key="index">
      <header>
        <div class="fl shop-title">商城商品配置{{index+1}}</div>
        <div class="fr">
          <div class="list-btn" @click="modifyConfig(item.id,item.netbarIdList,item.productList)">修改</div>
        </div>
      </header>
      <div class="content-view">
        <div class="fl">
          <p>生效网吧</p>
          <ul>
            <li class="bar-li" v-for="(v,i) in item.netbarIdList" :key="i">{{v.barName}}</li>
          </ul>
        </div>
        <div class="fr">
          <p>生效商品</p>
          <ul>
            <li class="goods-li" v-for="(item,index) in item.productList" :key="index">
              <p :title="item.productName">{{item.productName}}</p>
              <img :src="item.productImgUrl" alt>
              <div class="view-price">
                <span>{{item.goldSalePrice}}</span>
                <span class="icon-gold"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <header>
      <div class="fl shop-title">商城商品配置{{listDate.length+1}}</div>
      <div class="fr">
        <div class="list-btn" @click="modifyConfig()">添加</div>
      </div>
    </header>
  </div>
</template>
<script>
// request
export default {
  props: {
    isShow: Boolean,
    listDate: Array,
    shopInfo: Object,
    barList: Array
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goBack() {
      this.$emit("changeState", 1);
    },
    modifyConfig(id,netbarIdList,productList) {
      this.$emit("stepGo", {
        step: 1,
        configType: true,
        configId: id,
        netbarIdList:netbarIdList,
        productList:productList
      });
    },
    recordType: function(val) {
      if (val) {
        return (val = "兑换成功");
      } else {
        return (val = "兑换失败");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/shop/config.scss";
header {
  width: 100%;
  height: 40px;
  background: rgba(34, 38, 48, 1);
  line-height: 40px;
  padding: 0 20px;
  vertical-align: middle;
  overflow: hidden;
  .list-btn {
    width: 58px;
    height: 24px;
    background: linear-gradient(
      0deg,
      rgba(78, 124, 240, 1),
      rgba(59, 107, 229, 1),
      rgba(59, 107, 229, 1)
    );
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
}
.config-list {
  > .content-view {
    > div {
      width: 50%;
      text-align: left;
      > p {
        color: #99d6ff;
        font-size: 16px;
        margin: 16px 0;
      }
      > ul {
        padding-left: 40px;
        .bar-li {
          min-width: 62px;
          display: inline-block;
          font-size: 14px;
          margin: 0 20px 30px 0;
        }
        .goods-li {
          width: 124px;
          float: left;
          margin: 16px 25px 0 0;
          position: relative;
          text-align: center;
          > p {
            max-width: 100%;
            color: #fff;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > img {
            width: 124px;
            height: 124px;
            opacity: 0.66;
            margin: 14px 0;
          }
          .view-price {
            width: 100%;
            line-height: 12px;
            margin: 11px 0 7px;
            vertical-align: middle;
            position: absolute;
            left: 0;
            bottom: 26px;
            > span {
              color: #ffcc00;
              font-size: 14px;
            }
            .icon-gold {
              width: 11px;
              height: 12px;
            }
          }
        }
      }
    }
  }
}
</style>


