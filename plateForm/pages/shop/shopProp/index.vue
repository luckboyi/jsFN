<template>
  <div class="w12 clearfix main-content noSelect" style="max-width:1200px;">
    <!-- 左侧游戏列表 -->
    <div
      class="left pr"
      style="padding-top:66px;z-index:20;position:relative;height:100%; box-sizing:border-box;"
    >
      <game-list ref="gameList" style="height:100%;" @select="selectGame"></game-list>
    </div>
    <div class="right shop-content tac" style="z-index:0;">
      <div class="content-header clearfix">
        <h4 class="fl f16 gobackIcon pr cp" style="padding:0 30px" @click="goBack">返回</h4>
        <div class="fl">
          <div
            v-for="(item,index) in propTitle"
            :key="index"
            :class="{titleActive:item.isActive}"
            @click="tabsSwitch(index,item.id)"
          >{{item.name}}</div>
        </div>
        <div class="fr">
          <div class="header-btn" v-if="shopInfo.records">
            <nuxt-link to="/shop/shopConfig">商城配置</nuxt-link>
          </div>
          <div class="header-gold">
            当前金币:
            <span>{{$store.state.user.basicInfo.gold}}</span>
          </div>
        </div>
      </div>
      <div class="content-view scrollStyle">
        <ul>
          <li>
            <div></div>
            <div>添加时间</div>
            <div>道具名称</div>
            <div>单价</div>
            <div>数量</div>
            <div></div>
          </li>
          <li  v-for="(item,index) in ShopPropList.records" :key="index">
            <div>
              <img :src="item.goodsImgUrl" alt>
            </div>
            <div>{{item.createTime}}</div>
            <div>{{item.goodsName}}</div>
            <div>
              <span>{{item.goodsPrice}}</span>
              <span class="icon-gold"></span>
            </div>
            <div>
              <div v-if="item.status==1">
                <!-- <div class="num-operate" @click="propReduce(item.goodsNum,index)">-</div>
                <input type="text" v-model="item.goodsNum">
                <div class="num-operate" @click="propAdd(item.goodsNum,index)">+</div>-->
                {{item.goodsNum}}
              </div>
              <div v-if="item.status==2">{{item.goodsNum}}</div>
            </div>
            <div class="propType">
              <div
                class="type-active"
                v-if="item.status==0"
                @click="propExtract(item,item.goodsNum)"
              >提取</div>
              <div v-if="item.status==2">已发货</div>
              <div v-if="item.status==1">待发货</div>
            </div>
          </li>
          <li v-if=" ShopPropList.records == ''"  class="tac" style="margin:20px 0;">暂无数据！</li>
        </ul>
      </div>
      <div class="page-bar"   v-if="ShopPropList.records !='' && ShopPropList.records !=undefined" >
        <ul>
          <li v-if="cur>1">
            <a v-on:click="cur--,pageClick()">《</a>
          </li>
          <li v-if="cur==1">
            <a class="banclick">《</a>
          </li>
          <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}" :key="index">
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur!=all">
            <a v-on:click="cur++,pageClick()">》</a>
          </li>
          <li v-if="cur == all">
            <a class="banclick">》</a>
          </li>
          <!-- <li>
              <a>
                共
                <i>{{all}}</i>页
              </a>
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import GameList from "~/components/list/gameList";
import configSuccess from "~/components/shop/configSuccess";
import shopRecord from "~/components/shop/shopRecord";

// request
import {
  getGoodsList,
  getShopInfo,
  getShopProp,
  getExtractOrder
} from "@/request/shopInfo";

export default {
  components: {
    GameList,
    configSuccess,
    shopRecord
  },
  data() {
    return {
      gameId: 1,
      shopInfo: {}, //商城基本信息
      ShopPropList: {
        records:[]
      }, //商城道具列表
      showModel: false,
      gameList: [],
      liNum: 12,
      all: 0, //总页数
      cur: 1, //当前页码
      status: 0, //待提取
      propTitle: [
        { name: "待提取", isActive: true, id: 0 },
        { name: "待发货", isActive: false, id: 1 },
        { name: "已发货", isActive: false, id: 2 }
      ]
    };
  },
  watch: {
    cur: function(oldValue, newValue) {
    }
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window !== "undefined") {
      // 滚动条移除
      document.querySelector("body").style.overflow = `hidden`;
    }
    next(vm => {
      document.title = `${vm.$PROJECT_INFO.name}(商城)`;
    });
  },
  beforeRouteLeave(to, from, next) {
    // 滚动条恢复
    document.querySelector("body").style.overflow = `auto`;
    next();
  },
  computed: {
    ...mapState({
      canCreateMatch: state => state.user.basicInfo.canCreateMatch
    }),
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  mounted() {
    this.$refs.gameList.init();
    this.getShopPropList({
      status: this.status,
      current: 1,
      pageSize:7
    });
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    tabsSwitch: function(index, id) {
      this.propTitle.forEach(element => {
        element.isActive = false;
        this.propTitle[index].isActive = true;
      });
      this.status = id;
      //根据id获取待提取或已提取的数据
      this.getShopPropList({
        status: this.status,
        current: 1,
        pageSize:7
      });
    },
    propAdd: function(num, i) {
      this.ShopPropList.records[i].goodsNum =
        this.ShopPropList.records[i].goodsNum + 1;
    },
    propReduce(num, i) {
      if (num <= 0) {
        return (this.ShopPropList.records[i].goodsNum = 0);
      } else {
        return (this.ShopPropList.records[i].goodsNum -= 1);
      }
    },
    async getShopInfo() {
      let res = await getShopInfo();
      this.shopInfo = res;
    },
    btnClick: function(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      this.getShopPropList({
        current: this.cur,
        pageSize:7,
        status: this.status,
      });
    },
    pageClick: function() {
      this.getShopPropList({
        current: this.cur,
        pageSize:7,
        status: this.status,
      });
    },
    // 选择游戏
    selectGame(id) {
      this.gameId = id;
    },
    async getShopPropList(paramett) {
      let res = await getShopProp(paramett);
      this.ShopPropList = res.data;
      this.all = Math.ceil(this.ShopPropList.total / 7);
    },
    async getExtractOrder(paramett) {
       let res = await getExtractOrder(paramett);
       if(res.code == 200){
         maskCom({
           txt:[res.msg]
         })
          this.getShopPropList({
            status: this.status,
            current: 1,
            pageSize:7
          });
       }else{
         maskCom({
           txt:[res.msg]
         })
       }
    },
    propExtract(data, num) {
      let self = this;
      self.$shopTakeCom({
        type: 4,
        title: "商品提取",
        dataList: {
          shopName: data.goodsName,
          shopPrice: data.costPrice
        },
        firstBtnTxt: "确定",
        secBtnTxt: "取消",
        firstBtnFn: function() {
          // self.$shopTakeCom({
          //   type: 2,
          //   title: "商品提取",
          //   dataList: {
          //     shopName: data.goodsName,
          //     shopPrice: data.costPrice,
          //     shopNumber: 1
          //   },
          //   firstBtnTxt: "确定",
          //   secBtnTxt: "取消",
          //   firstBtnFn: function() {
          //     self.getExtractOrder({
          //       orderNo: data.orderNo
          //     });
          //   }
          // });
          self.getExtractOrder({
            orderNo: data.orderNo
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/animate/default.scss";
.applyOfficialGame {
  line-height: 40px;
  width: 120px;
  left: 50% !important;
  bottom: 80px !important;
  border-radius: 6px;
}
.bodyCon {
  padding-top: 70px !important;
}
.left {
  float: left;
  width: 220px;
  padding-top: 26px !important;
}
.right {
  float: left;
  margin-left: 30px;
  width: 950px;
  position: absolute;
  left: 210px;
  top: 26px;
  bottom: 0;
}
.shop-content {
  width: 960px;
  height: 660px;
  background: rgba(19, 23, 29, 1);
  border: 1px solid rgba(49, 56, 70, 1);
  padding: 16px 30px 10px;
  .content-header {
    height: 62px;
    line-height: 62px;
    .fl {
      > div {
        width: 70px;
        color: rgba(152, 152, 152, 1);
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        position: relative;
        &.titleActive {
          color: #ff9900;
          &::after {
            content: "";
            width: 70px;
            height: 2px;
            background: rgba(255, 153, 0, 1);
            position: absolute;
            left: 0;
            bottom: -1px;
          }
        }
      }
    }
    .fr {
      color: #fff;
      text-align: right;
      font-size: 14px;
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
  }
  .content-view {
    ul {
      width: 100%;
      overflow: hidden;
    }
    li {
      height: 65px;
      background: #13171d;
      border-bottom: 1px solid rgba(0, 0, 0, 1);
      box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.05);
      line-height: 65px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      vertical-align: middle;
      img {
        width: 42px;
        height: 42px;
      }
      > div {
        color: rgba(221, 221, 221, 1);
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
        line-height: 65px;
        vertical-align: middle;
        &:nth-of-type(4) {
          flex: 1;
        }
        .type-active {
          width: 80px;
          height: 32px;
          background: linear-gradient(0deg, #d86611, #edbe1d);
          cursor: pointer;
          line-height: 32px;
        }
        .icon-gold {
          display: inline-block;
          width: 14px;
          height: 15px;
          background-image: url("~assets/img/icon/gold.png");
          background-size: cover;
          margin-left: 6px;
        }
      }
      input[type="text"] {
        width: 46px;
        height: 26px;
        background: #15181c;
        text-align: center;
      }
      .num-operate {
        width: 26px;
        height: 26px;
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        line-height: 26px;
        &:first-child {
          position: relative;
          &::after,
          &::before {
            content: "";
            width: 56px;
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            position: absolute;
            left: 26px;
          }
          &::after {
            top: 0;
          }
          &::before {
            bottom: 0;
          }
        }
      }
    }
  }
  .page-bar {
    width: 120px;
    position: absolute;
    right: calc(50% - 60px);
    bottom: 12px;
    li:first-child > a {
      margin-left: 0px;
    }
    a {
      text-decoration: none;
      position: relative;
      float: left;
      padding: 4px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      :hover {
        background-color: #eee;
      }
      &.banclick {
        color: #ff9900;
        cursor: not-allowed;
      }
    }
    .active a {
      color: #ff9900;
      cursor: default;
    }
    i {
      font-style: normal;
      color: #d44950;
      margin: 0px 4px;
      font-size: 12px;
    }
  }
}
.z-top {
  z-index: 10;
}
.main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  bottom: 0;
  overflow: hidden;
}
</style>
