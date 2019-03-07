<template>
  <div>
    <header>
      <div class="fl shop-title gobackIcon pr" style="padding:0 0 0 30px;" @click="goBack">返回</div>
      <div class="fr">
        <div class="header-gold">
          当前金币:
          <span>{{$store.state.user.basicInfo.gold}}</span>
        </div>
      </div>
    </header>
    <div class="content-view"  style="width:100%;height: 586px; overflow-y: auto;">
      <ul>
        <li>
          <div>时间</div>
          <div>商品</div>
          <div>消耗</div>
          <div>状态</div>
          <div>兑换订单号</div>
        </li>
        <li v-if="recordData.length!=0" v-for="(item,index) in recordData" :key="index">
          <div>{{item.createTime}}</div>
          <div>{{item.productName}}</div>
          <div>{{item.orderGoldAmount}}</div>
          <div :class="{'text-red':item.status==3 || item.status == 1}">{{recordType(item.status)}}</div>
          <div>{{item.orderNo}}</div>
        </li>
        <li v-if="recordData.length==0">暂无数据!</li>
      </ul>
      <p class="tac cp" v-if="recordData.length>0" v-show="isShowload" @click="loaderMore" style="line-height:24px;background:#222630;">加载更多</p>
    </div>
  </div>
</template>
<script>
// request
export default {
  props: {
    isShow: Boolean,
    recordData: Array,
    shopInfo: Object,
    isShowload:Boolean
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$emit("changeState", 1);
    },
    recordType: function(val) {
      if (val == 2) {
        return (val = "兑换成功");
      } else {
        return (val = "兑换失败");
      }
    },
    loaderMore(){
      this.$emit('loaderMore')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/shop/config.scss";
header {
  min-height: 95px;
  line-height: 95px;
  .shop-title {
    color: rgba(221, 221, 221, 1);
    cursor: pointer;
    font-size: 22px;
  }
  .header-btn {
    width: 94px;
    height: 30px;
    background: linear-gradient(
      0deg,
      rgba(78, 124, 240, 1),
      rgba(59, 107, 229, 1),
      rgba(59, 107, 229, 1)
    );
    border-radius: 15px;
    cursor: pointer;
    display: inline-block;
    line-height: 30px;
    margin-right: 12px;
    text-align: center;
    &:hover {
      opacity: 0.8;
    }
    > a {
      color: #fff;
    }
  }
  .header-gold {
    display: inline-block;
    > span {
      color: #ff9933;
      font-size: 16px;
    }
  }
}

.content-view {
  ul {
    width: 100%;
    overflow: hidden;
  }
  li {
    height: 34px;
    background: rgba(48, 58, 81, 0.7);
    line-height: 34px;
    display: flex;
    margin-bottom: 1px;
    justify-content: space-around;
    text-align: center;
    &:first-child {
      background: rgba(41, 47, 61, 1);
    }
    > div {
      color: rgba(221, 221, 221, 1);
      font-size: 12px;
      flex: 2;
      &:nth-of-type(4) {
        flex: 1;
      }
    }
  }
}
</style>


