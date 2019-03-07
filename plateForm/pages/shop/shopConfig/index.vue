<template>
  <div>
    <div v-if="configType==0" class="w12 clearfix main-content noSelect" style="max-width:1200px;">
      <first-config :fruits="fruits" :isShow="step==1" @stepGo="stepGo"></first-config>
      <second-config :goodsList="goodsList" :isShow="step==2" @stepGo="stepGo"></second-config>
      <third-config
        :goodsList="goodsList"
        :barList="barList"
        :selfBarList="selfBarList"
        :configBarId="configBarId"
        :isShow="step==3"
        @stepGo="stepGo"
        :configId="configId"
      ></third-config>
    </div>
    <div v-if="configType==1" class="w12 clearfix noSelect" style="max-width:1200px;">
      <config-list :listDate="listDate" @stepGo="stepGo"></config-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import firstConfig from "~/components/shop/configFirst";
import secondConfig from "~/components/shop/configSecond";
import thirdConfig from "~/components/shop/configThird";
import configList from "~/components/shop/configList";

// request
import {
  getProductList,
  getShopInfo,
  getConfigList,
  findUserConfigList,
  getOwnerbars
} from "@/request/shopInfo";

export default {
  components: {
    firstConfig,
    secondConfig,
    thirdConfig,
    configList
  },
  data() {
    return {
      fruits: [],
      step: 1,
      goodsList: [],
      configType: 100, //是否已配置商城 0：否  1：是
      shopType: 0, //商城类型 0：全网  1：网吧
      listDate: [], //已配置数据集合
      barList: [], //业主所有网吧集合
      selfBarList: {}, //业主当前网吧信息集合
      configId: 0, //配置ID,
      configBarId: [], //已配置的网吧id
      productList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window !== "undefined") {
      // 滚动条移除
      document.querySelector("body").style.overflow = `hidden`;
    }
    next(vm => {
      document.title = `${vm.$PROJECT_INFO.name}(商城配置)`;
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
    })
  },
  mounted() {
    this.getUserConfigList();
  },
  methods: {
    async getUserConfigList() {
      // 增加判断是否已登录
      let barsRres = await getOwnerbars();
      let res = await findUserConfigList();
      // 如果是网吧业主并且未配置本网吧商城
      if (res.code == 400 && barsRres.code != 400) {
        this.configType = 0;
        this.getProductList();
      } else if (barsRres.code == 200) {
        this.barList = barsRres.data;
        this.configType = 1;
        this.listDate = res.data;
        this.listDate.forEach(j => {
          j.netbarIdList.forEach((k, index) => {
            barsRres.data.forEach(element => {
              if (element.barId == k) {
                j.netbarIdList[index] = {
                  barId: k,
                  barName: element.barName
                };
              }
            });
          });
        });
      } else {
        // 非网吧业主
        // this.configType = 1;
        // this.getConfigList();
        this.$router.push({
          path: "/shop"
        });
      }
    },
    async getGoodList(paramett) {
      if (this.$store.state.shop.userRole == 0) {
        // 如果是网吧业主请求已配置列表
        let res = await findUserConfigList();
        res.data[0].productList.forEach(element => {
          element.goodsName = element.productName;
          element.imgUrl = element.productImgUrl;
        });
        this.GoodsList = res.data[0].productList;
      } else {
        let res = await getGoodList(paramett);
        if (res.code == 200) {
          this.GoodsList = res.data.records;
        }
      }
      this.all = Math.ceil(this.GoodsList.goodsTotal / 12);
    },
    checkedOne(fruitId) {
      // 选中该checkbox
      this.fruitIds.push(fruitId);
    },
    async stepGo(res) {
      if (res.netbarIdList != undefined) {
        this.configBarId = res.netbarIdList;
        this.productList = res.productList;
      }
      this.step = res.step;
      if (res.data) {
        this.goodsList = res.data;
      }
      if (res.configType) {
        this.getProductList();
        this.configType = 0;
      }
      if (res.configId) {
        this.configId = res.configId;
      }
      if (res.step == 3) {
        let barsRres = await getOwnerbars();
        barsRres.data.forEach(element => {
          element.state = false;
        });
        this.barList = barsRres.data;
        this.configBarId.forEach(el => {
          let index = this.barList.findIndex(item => item.barId == el.barId);
          if (index != -1) {
            this.barList[index].state = true;
          }
        });
        this.barList.forEach((element, index) => {
          if (element.barId == this.$store.state.fromClient.barId) {
            this.selfBarList.barName = element.barName;
            this.selfBarList.barId = this.$store.state.fromClient.barId;
          }
          // if (this.selfBarList.barName == element.barName) {
          //   this.barList.splice(index, 1);
          // }
        });
      }
      if (res.step == 4) {
        this.$router.push({
          path: "/shop"
        });
      }
    },
    async getProductList(paramett) {
      let res = await getProductList(paramett);
      res.forEach(element => {
        element.state = false;
        element.goodsPrice = "";
      });
      this.fruits = res;
      this.productList.forEach(el => {
        let index = this.fruits.findIndex(item => item.id == el.sysProductId);
        if (index != -1) {
          this.fruits[index].state = 1;
          this.fruits[index].goodsPrice = el.goldSalePrice / 100;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/components/shop/config.scss";
</style>
<style>
.bodyCon {
  height: calc(100vh - 116px);
}
</style>
