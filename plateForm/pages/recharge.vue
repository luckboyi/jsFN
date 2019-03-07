<template>
  <!-- 充值页面 -->
  <div class="w12">
    <div class="box content-bg">
      <div class="row goods-list">
        <span>选择购买钻石数量：</span>
        <!-- 套餐列表 -->
        <ul>
          <li
            v-for="(item,index) in goodsList"
            v-cloak
            @click.prevent="activeGoods=item.goodsId"
            :class="{'active':activeGoods==item.goodsId}"
          >
            <div>
              <p style="font-size:18px;padding-top:4px;">
                <!-- 钻石数 -->
                <span v-text="item.diamondAmount"></span>
                <span class="icon-zuans12-10"></span>
              </p>
              <p style="font-size:14px;padding-top:2px;">
                <!-- 价格数 -->
                <span v-text="moneyToFixed2(item.price)+'¥'"></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="row way-list" style="margin-bottom:30px;">
        <span>选择支付渠道：</span>
        <!-- 支付方式列表 -->
        <ul>
          <li
            v-for="(item,index) in wayList"
            v-cloak
            @click.prevent="activeWay=item.id"
            :class="{'active':activeWay==item.id}"
          >
            <div>
              <span :class="item.icon"></span>
              <span v-text="item.name"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="row" style="margin-bottom:30px;">
        <span></span>
        <!-- 按钮组 -->
        <div class="fl">
          <!-- 错误提示 -->
          <div class="wrong-msg" ref="wrongMsg" style="min-height:16px;">
            <!-- 错误提示 -->
            <span class="text-red" v-text="wrongTxt"></span>
          </div>
        </div>
      </div>
      <div class="row button-group">
        <span></span>
        <!-- 按钮组 -->
        <div v-if="loginState==1" class="fl orange-btn recharge-btn" @click.prevent="toPay">前往充值</div>
        <div
          v-if="loginState==0"
          class="fl orange-btn recharge-btn"
          @click.prevent="toLogin"
        >请先登录后充值</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// 引入支付配置
import { PAY_PLUGIN } from "@/assets/config/pay";

import { moneyToFixed2 } from "@/assets/utils/numberFn";

// request
import { getDiamondListData, toBuyDiamond } from "@/request/recharge";

export default {
  data() {
    return {
      wrongTxt: "",
      goodsList: [
        // {
        // diamondNum: 100, //钻石数
        // price: 1,    //价格数
        // id: 1    //套餐id
        // }
      ],
      activeGoods: null, //激活的支付套餐
      wayList: PAY_PLUGIN.way_list, //支付方式列表
      activeWay: 1, //激活的支付方式
      timeInterval: null
    };
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window !== "undefined") {
      document.querySelector("body").style.overflow = `hidden`;
    }
    next(vm => {
      document.title = `${vm.$PROJECT_INFO.name}(充值)`;
      // 进入充值页面默认获取套餐列表
      vm.getGoodsList();
    });
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector("body").style.overflow = `auto`;
    next();
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState
    })
  },
  methods: {
    ...mapActions(["pay/actionShowWxModal", "login/actionShowLoginBox"]),
    moneyToFixed2,
    toLogin() {
      this["login/actionShowLoginBox"]();
    },
    // 设置错误信息
    setWrongTxt(txt) {
      this.wrongTxt = txt;
      this.$domFn.shake(this.$refs.wrongMsg);
    },
    // 获取钻石套餐列表
    async getGoodsList() {
      this.goodsList = await getDiamondListData();
      // 默认选中第一个方式
      if (this.goodsList && this.goodsList.length > 0) {
        this.activeGoods = this.goodsList[0].goodsId;
      }
    },
    // 去支付
    async toPay() {
      // 清空错误信息
      this.wrongTxt = "";
      // 提交套餐订单
      let res = await toBuyDiamond({
        goodsId: this.activeGoods, //套餐id
        payWay: this.activeWay //支付方式
      });
      // 如果后台创建套餐订单返回错误
      if (res.code == 402) {
        this.maskCom({
          txt: ["您暂未登录或登录超时，请前往登录！"],
          firstBtnTxt: "前往登录",
          firstBtnFn: () => {
            $nuxt.$store.dispatch("login/actionShowLoginBox");
          }
        });
        return false;
      }
      if (res.code != 200) return this.setWrongTxt(res.msg);
      // 后台创建支付订单成功,则获取跳转支付链接
      let payHref = PAY_PLUGIN.getRedirectUrl(res.data, "", "");
      // 若是弹窗支付,3分钟定时刷新二维码
      for (let item of PAY_PLUGIN.way_list) {
        if (item.id == this.activeWay) {
          if (item.iframeShow) {
            this["pay/actionShowWxModal"](payHref);
            clearTimeout(this.timeInterval);
            this.timeInterval = setTimeout(() => {
              if (this.$store.state.pay.wxModalShow) {
                this.toPay();
              }
            }, 180000);
            return;
          }
        }
      }
      // 直接跳转支付方式
      return (window.location.href = payHref);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
$goodsListHeight: 56px;
$wayListHeight: 40px;
.box {
  padding-top: 66px;
  padding-bottom: 214px;
}
.row {
  padding-left: 80px;
  overflow: hidden;
  margin-bottom: 50px;
  > span {
    float: left;
    width: 140px;
    height: 1px;
    font-size: 14px;
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      border: 1px solid rgba(239, 144, 31, 1);
      border-radius: 4px;
      border-color: rgba(87, 98, 114, 1);
      margin-right: 20px;
      transition: all 0.3s;
      cursor: pointer;
      text-align: center;
      margin-bottom: 10px;
      font-size: 14px;
      color: #bebed0;
    }
  }
}
.goods-list {
  > span {
    line-height: $goodsListHeight;
    height: $goodsListHeight;
  }
  li {
    width: 120px;
    height: $goodsListHeight;
    &:hover {
      background: rgba(53, 46, 37, 1);
      border: 1px solid rgba(239, 144, 31, 1);
      p {
        text-align: center;
        color: #fff;
      }
      p + p {
        color: #b2b2b2;
      }
    }
    p {
      text-align: center;
      color: #b1bed0;
    }
    p + p {
      color: #6b7687;
    }
  }
  li.active {
    background: rgba(53, 46, 37, 1);
    border: 1px solid rgba(239, 144, 31, 1);
    position: relative;
    color: #fff;
    overflow: hidden;
    p {
      text-align: center;
      color: #fff;
    }
    p + p {
      color: #b2b2b2;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      right: -1px;
      bottom: 0;
      border-style: solid;
      border-color: transparent transparent $yellow transparent;
      border-width: 0 0 24px 24px;
      width: 0px;
      height: 0px;
      z-index: 11;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      right: -2px;
      bottom: 3px;
      width: 18px;
      height: 12px;
      background: url("~assets/img/icon/gou.png") no-repeat;
      z-index: 12;
    }
  }
}
.way-list {
  > span {
    line-height: $wayListHeight;
    height: $wayListHeight;
  }
  li {
    width: 120px;
    height: $wayListHeight;
    line-height: $wayListHeight;
    box-sizing: border-box;
  }
  // 支付宝
  li:first-child {
    &:hover,
    &.active {
      border: 1px solid rgba(16, 130, 212, 1);
      color: rgba(16, 130, 212, 1);
    }
  }
  // 微信
  li:first-child + li {
    &:hover,
    &.active {
      border: 1px solid rgba(26, 175, 65, 1);
      color: rgba(26, 175, 65, 1);
    }
  }
}
.recharge-btn {
  width: 198px;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
}
.icon-zuans12-10 {
  position: relative;
  top: -1px;
}
.icon-alipay {
  display: inline-block;
  vertical-align: middle;
  top: -3px;
  position: relative;
  width: 32px;
  height: 22px;
  background: url("~assets/img/icon/alipay.png") no-repeat;
  background-size: cover;
}
.icon-wxpay {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -3px;
  width: 24px;
  height: 22px;
  background: url("~assets/img/icon/wxpay.png") no-repeat;
  background-size: cover;
}
</style>


