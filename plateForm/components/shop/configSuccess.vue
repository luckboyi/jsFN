<template>
  <div v-if="isShow">
    <header>
      <div class="fl shop-title">本网吧商品</div>
      <div class="fr">
        <div
          v-show="$store.state.user.loginState"
          v-if="$store.state.shop.userRole==0"
          class="header-btn"
        >
          <nuxt-link to="/shop/shopConfig">修改配置</nuxt-link>
        </div>
        <div class="header-btn" v-show="$store.state.user.loginState" @click="isRecord(1)">兑换记录</div>
        <div class="header-gold" v-show="$store.state.user.loginState">
          当前金币:
          <span>{{$store.state.user.basicInfo.gold}}</span>
        </div>
      </div>
    </header>
    <div class="content-view">
      <ul  style="height:586px;overflow-y:auto;">
        <li v-if="GoodsList.length>0" v-for="(item,index) in GoodsList" :key="index">
          <p :title="item.goodsName" class="tac">{{item.goodsName}}</p>
          <img :src="item.imgUrl" alt>
          <div class="view-price">
            <span>{{item.goldSalePrice}}</span>
            <span class="icon-gold" ></span>
          </div>
          <div class="convert-btn" @click="goodsExchange(item)">兑换</div>
        </li>
        <li v-else style="padding:20px 0;">暂无数据！</li>
      </ul>
    </div>
  </div>
</template>
<script>
// request
import {
  getGoodList,
  getUserExchange,
  getExchangeOrder,
  getOwnerbars
} from "@/request/shopInfo";
export default {
  props: {
    isShow: Boolean,
    shopInfo: Object,
    findUserRes: Object
  },
  data() {
    return {
      GoodsList: {}
    };
  },
  mounted() {
    this.getGoodList();
  },
  methods: {
    goodsExchange(data) {
      let self = this;
      if(!this.$store.state.user.loginState){
        maskCom({
          txt: ['您暂未登录或登录超时，请前往登录！'],
          firstBtnTxt: '前往登录',
          firstBtnFn: () => {
            $nuxt.$store.dispatch('login/actionShowLoginBox')
          }
        })
      }else{
         self.$shopTakeCom({
        type: 4,
        title: "商品提取",
        dataList: {
          shopName: data.goodsName,
          shopPrice: data.goldSalePrice
        },
        firstBtnTxt: "确定",
        secBtnTxt: "取消",
        firstBtnFn: function() {
          if (data.type == 2) {
            self.$shopTakeCom({
              type: 2,
              title: "商品提取",
              dataList: {
                shopName: data.goodsName,
                shopPrice: data.goldSalePrice,
                shopNumber: 1
              },
              firstBtnTxt: "确定",
              secBtnTxt: "取消",
              firstBtnFn: function() {
                self.getExchangeOrder({
                  goodsId: data.id
                });
              }
            });
          } else {
            // data.type == 1
            var res = self.getUserExchange({
              netbarId: self.$store.state.fromClient.barId,
              productCount: 1,
              productId: data.id
            });
          }
        }
      });
      }
     
    },
    async getExchangeOrder(paramett) {
      let res = await getExchangeOrder(paramett);
    },
    async getUserExchange(paramett) {
      let res = await getUserExchange(paramett);
      if (res.code == 200) {
        this.$shopTakeCom({
          type: 7,
          title: "",
          dataList: { imgUrl: "data:image/png;base64," + res.data.qrCodeBase64 }
        });
        this.$store.commit("user/setMoney", res.data.goldAmount);
      } else {
        maskCom({
          txt: [res.msg]
        });
      }
    },
    async getGoodList(paramett) {
      // 获取商品信息
      if (
        this.findUserRes.code == 200 &&
        this.$store.state.fromClient.barId != ""
      ) {
        // 如果是网吧业主请求已配置列表
        let res = this.findUserRes;
        if (res.code == 200) {
          res.data.records.forEach(element => {
            element.goodsName = element.productName;
            element.imgUrl = element.productImgUrl;
          });
          this.GoodsList = res.data.records;
        } else {
          maskCom({
            txt: [res.msg]
          });
        }
      } else {
        let res = await getGoodList(paramett);
        this.GoodsList = res.data.records;
      }
      this.all = Math.ceil(this.GoodsList.goodsTotal / 12);
    },
    isRecord() {
      this.$emit("showRecord", 2);
    },
    modifyConfig(id) {
      this.$emit("stepGo", {
        step: 1,
        configType: true,
        configId: id
      });
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
    width: 124px;
    float: left;
    margin: 30px 25px 0 0;
    position: relative;
    > p {
      color: #fff;
      font-size: 16px;
      max-width: 100%;
      margin-top: 8px;
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
      bottom: 40px;
      text-align: center;
      > span {
        color: #ffcc00;
        font-size: 14px;
      }
      .icon-gold {
        width: 11px;
        height: 12px;
        background-size: cover;
      }
    }
    > .convert-btn {
      width: 90px;
      height: 24px;
      background: rgba(250, 165, 1, 0.12);
      border: 1px solid rgba(222, 146, 26, 1);
      color: #fea700;
      cursor: pointer;
      border-radius: 12px;
      line-height: 21px;
      margin: 0 auto;
      text-align: center;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>


