<template>
  <div>
    <div v-if="state==0" class="w12 clearfix main-content" style="max-width:1200px;">
      <!-- 左侧游戏列表 -->
      <div
        class="left pr"
        style="padding-top:66px;z-index:20;position:relative;height:100%; box-sizing:border-box;"
      >
        <game-list ref="gameList" style="height:100%;" @select="selectGame"></game-list>
      </div>
      <div class="right shop-content tac" style="z-index:0;">
        <div class="content-header">
          <!--  v-if="shopInfo.isOwner" -->
          <div class="header-btn" v-show="$store.state.user.loginState" v-if="showConfig">
            <nuxt-link to="/shop/shopConfig">商城配置</nuxt-link>
          </div>
          <div class="header-btn" v-show="$store.state.user.loginState">
            <nuxt-link to="/shop/shopProp">我的道具</nuxt-link>
          </div>
          <div class="header-gold" v-show="$store.state.user.loginState">
            当前金币:
            <span>{{$store.state.user.basicInfo.gold}}</span>
          </div>
        </div>
        <div class="content-view">
          <ul>
            <li class="pr" v-for="(item,index) in GoodsList.records" :key="index">
              <p class="ells1" :title="item.goodsName">{{item.goodsName}}</p>
              <img :src="item.imgUrl" alt>
              <p class="pa leftCenter mainCol" style="bottom:50px;display:inline-table;">{{item.goodsPrice}}<i style="margin-right:6px;" class="goldIcon fl"></i></p>
              <div class="convert-btn" @click="goodsExchange(item)">兑换</div>
            </li>
          </ul>
        </div>
        <div class="page-bar">
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
    <div v-if="state==1" class="w12 clearfix main-content" style="max-width:1200px;">
      <config-success
        :isShow="state==1"
        :shopInfo="shopInfo"
        :findUserRes="successResData"
        @showRecord="showRecord"
      ></config-success>
    </div>
    <div v-if="state==2" class="w12 clearfix main-content" style="max-width:1200px;">
      <shop-record :isShowload="isShowload" :shopInfo="shopInfo" @loaderMore="loaderMore" :recordData="recordData" @changeState="changeState"></shop-record>
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
  getGoodList,
  geSshopRecord,
  findUserConfigList,
  getOwnerbars,
  getSelectProductList,
  getUserExchange,
  getExchangeOrder
} from "@/request/shopInfo";

export default {
  components: {
    GameList,
    configSuccess,
    shopRecord
  },
  data() {
    return {
      matchId: 0, //0:个人赛事；1:官方赛事
      gameId: 1,
      state: 100, //状态ID
      shopInfo: {}, //商城基本信息
      GoodsList: {}, //商城商品列表
      showConfig: false, //是否配置本地商城
      showModel: false,
      getInfo: [],
      gameList: [],
      liNum: 12,
      all: 0, //总页数
      cur: 1, //当前页码
      recordData: [],
      findUserRes: {},
      successResData: {},
      currentRecord:1,
      isShowload:true
    };
  },
  watch: {
    cur: function(oldValue, newValue) {
    },
    "$store.state.user.loginState": function() {
      this.isOwner();
    },
    "$store.state.fromClient.barId"() {
      this.getUserConfigList();
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
    if (this.state == 0) {
      // 渲染赛事
      this.$refs.gameList.init();
    }
    this.getUserConfigList();
    this.isOwner()
    //window.PlatformNotify(20,10000003);
  },
  methods: {
    goodsExchange(data) {
      let self = this;
      if (this.$store.state.user.loginState) {
        self.$shopTakeCom({
          type: 4,
          title: "商品提取",
          dataList: {
            shopName: data.goodsName,
            shopPrice: data.goodsPrice
          },
          firstBtnTxt: "确定",
          secBtnTxt: "取消",
          firstBtnFn: function() {
            if (data.type == 2 || data.type == 6) {
              self.getExchangeOrder({
                goodsId: data.id,
                barId:self.$store.state.fromClient.barId
              });
            } else {
              if (self.$store.state.fromClient.barId != "") {
                var res = self.getUserExchange({
                  netbarId: self.$store.state.fromClient.barId,
                  productCount: 1,
                  productId: data.id
                });
              }
            }
          }
        });
      } else {
        maskCom({
          txt: ["您暂未登录或登录超时，请前往登录！"],
          firstBtnTxt: "前往登录",
          firstBtnFn: () => {
            $nuxt.$store.dispatch("login/actionShowLoginBox");
          }
        });
      }
    },
    async getExchangeOrder(paramett) {
      let res = await getExchangeOrder(paramett);
      if (res.code == 200) {
        maskCom({
          txt: ["兑换成功"]
        });
        this.$store.commit("user/setMoney", res.data);
      } else {
        maskCom({
          txt: [res.msg]
        });
      }
    },
    async getUserExchange(paramett) {
      let res = await getUserExchange(paramett);
      if (res.code == 200) {
        this.$shopTakeCom({
          type: 7,
          title: "",
          dataList: { imgUrl: "data:image/png;base64," + res.data.qrCodeBase64 }
        });
      }
    },
    // 获取全网商城
    getAllShop() {
      this.state = 0;
      this.showConfig = false;
      this.getGoodList({
        current: this.cur,
        pageSize: 12
      });
    },
    // 获取网吧及业主信息
    async getUserConfigList() {
      let self = this;
      this.state = 0;
      if (this.$store.state.fromClient.barId != "") {
        this.successResData = await getSelectProductList({
          // 获取网吧列表
          barId: this.$store.state.fromClient.barId,
          current: this.cur,
          size: 100
        });
        if (this.successResData.code == 200) {
          this.state = 1;
          this.showConfig = false;
          this.GoodsList = this.successResData.data;
        } else {
          this.getAllShop();
        }
      } else {
        this.getAllShop();
      }
    },
    async isOwner() {
      // 查看是否为网吧业主
      let barsRres = await getOwnerbars();
      // 查看是否配置本网吧商城
      let res = await findUserConfigList();
      if (barsRres.code == 200) {
        this.findUserRes = res;
        this.showConfig = true;
        this.$store.commit("shop/setUserRole", 0);
      } else {
        this.$store.commit("shop/setUserRole", 1);
        self.showConfig = false;
      }

      if (barsRres.code != 400 && res.code == 400) {
        // 如果是网吧业主并且未配置本网吧商城
        self.$maskCom({
          txt: ["当前本商城还未配置，默认为全网商城是否配置本网吧商城"],
          isShowColoseBtn: true,
          firstBtnTxt: "确认",
          secBtnTxt: "取消",
          firstBtnFn: function() {
            self.$router.push({
              path: "/shop/shopConfig"
            });
          }
        });
      }
    },
    // 显示兑换记录
    async showRecord(id) {
      if(id == 2){
        this.currentRecord = 1
      }
      this.state = 2;
      //需要等待服务端接口
      let res = await geSshopRecord({
        status: "",
        current: this.currentRecord,
        size: 10
      });
      let barsList = await getOwnerbars();
      if(res.code == 200){
        if (res.data.records.length != 0) {
          this.totalTecords = Math.ceil(res.data.total/ 10)
          if(this.totalTecords> this.currentRecord){
            this.isShowload = true
          }else{
            this.isShowload = false
          }
          if(this.currentRecord != 1){
            if(barsList.code == 200){
              barsList.data.forEach(element => {
                res.data.records.forEach(val => {
                    if (element.barId == val.netbarId) {
                      val.netbarName = element.barName;
                    }
                    this.recordData.push(val)
                  });
              });
            }else{
              res.data.records.forEach(val => {
                this.recordData.push(val)
              });
            }
          }else{
            if(barsList.code == 200){
               barsList.data.forEach(element => {
                res.data.records.forEach(val => {
                  if (element.barId == val.netbarId) {
                    val.netbarName = element.barName;
                  }
                });
              });
            }
            this.recordData=res.data.records
          }
          
        } else {
          this.recordData = [];
        }
      }

      //this.changeState(id);
    },
    btnClick: function(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      this.getGoodList({
        current: this.cur,
        pageSize: 12
      });
    },
    loaderMore(){
      if(this.currentRecord< this.totalTecords){
          this.currentRecord+=1
          this.showRecord()
          this.isShowload =true
      }else{
        this.isShowload =false
      }
    },
    pageClick: function() {
      this.getGoodList({
        current: this.cur,
        pageSize: 12
      });
    },
    // 选择游戏
    selectGame(id) {
      this.gameId = id;
    },
    async getGoodList(paramett, barsRres) {
      //普通用户登录商城获取网吧ID查看本网吧商品
      this.GoodsList = [];
      if (this.showConfig && this.$store.state.fromClient.barId != "") {
        // 获取当前网吧ID
        this.successResData = await getSelectProductList({
          barId: this.$store.state.fromClient.barId,
          current: this.cur,
          size: 100
        });
        this.GoodsList = this.successResData.data;
      } else {
        let res = await getGoodList(paramett);
        this.GoodsList = res.data;
        this.all = Math.ceil(res.data.total / 12);
      }
    },
    changeState(id) {
      // 切换状态,后期看接口返回
      this.state = id;
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
  .content-view {
    ul {
      overflow: hidden;
    }
    li {
      width: 124px;
      float: left;
      margin: 30px 25px 0 0;
      > p {
        color: #fff;
        font-size: 16px;
      }
      > img {
        width: 124px;
        height: 124px;
        opacity: 0.66;
        margin: 14px 0;
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
        &:hover {
          opacity: 0.8;
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
