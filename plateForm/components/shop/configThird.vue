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
                <div class="view-price">
                  <span>{{fruit.goodsPrice}}</span>
                  <span class="icon-gold"></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="fr content-fr">
        <div class="fr-title">您拥有的网吧</div>
        <!-- <p class="fr-content-tip" v-show="selfBarList.barName">当前网吧</p>
        <div class="convert-checkbox"  v-show="selfBarList.barName">
          <p :title="selfBarList.barName">{{selfBarList.barName}}</p>
          <input
            type="checkbox"
            name="checkboxinput"
            class="input-checkbox"
            v-model="state"
            :id="selfBarList.barId"
            @click="checkedSelf(selfBarList.barId)"
            
          >
          <label :for="$store.state.fromClient.barId">
            <span>上架</span>
          </label>
        </div> -->
        <div v-if="barList.length>0">
          <p class="fr-content-tip">所有网吧</p>
          <div class="convert-checkbox">
            <p></p>

            <input
              type="checkbox"
              name="checkboxinput"
              class="input-checkbox"
              id="allSelect"
              v-model="isCheckedAll"
              @click="checkAll"
            >
            <label for="allSelect">
              <span>全部选择</span>
            </label>
          </div>
          <div class="convert-checkbox" v-for="(item,index) in barList" :key="index">
            <p :title="item.barName">{{item.barName}}</p>
            <input
              type="checkbox"
              name="checkboxinput"
              class="input-checkbox"
              v-model="item.state"
              :id="item.barId"
              @click="checkedOne(item.barId)"
            >
            <label :for="item.barId">
              <span>上架</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="config-btn" @click="goSecondStep">上一步</div>
    <div class="config-btn confirm" @click="Release">发布</div>
  </div>
</template>
<script>
import configHeader from "~/components/shop/configHeader";
import { saveConfig } from "@/request/shopInfo";
export default {
  props: {
    isShow: Boolean,
    goodsList: Array,
    barList: Array,
    selfBarList: Object,
    configId: Number,
    configBarId:Array
  },
  components: {
    configHeader
  },
  data() {
    return {
      headerText: "3:选择发布网吧",
      productPrice: 0,
      state: true,
      isCheckedAll: false,
      selectList: [] //最终传送给服务端的选中网吧集合
    };
  },
  mounted() {},
  methods: {
    goSecondStep() {
      this.$emit("stepGo", { data: this.goodsList, step: 2 });
    },
    checkedSelf(id) {
    },
    checkAll() {
      // 网吧全选
      this.selectList = [];
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        this.barList.forEach(element => {
          element.state = true;
          this.selectList.push(element.barId);
        });
      } else {
        this.barList.forEach(element => {
          element.state = false;
        });
      }
    },
    checkedOne(fruitId) {
      // 选中网吧
      let idIndex = this.selectList.indexOf(fruitId);
      if (idIndex >= 0) {
        // 如果已经包含了该id, 则去除
        this.selectList.splice(idIndex, 1);
      } else {
        this.selectList.push(fruitId);
      }

    },
    async Release() {
      //发布
      this.selectList = []
      this.barList.forEach(el => {
        if(el.state){
          this.selectList.push(el.barId)
        }else{
          var index = this.selectList.findIndex(ele => ele.barId == el.barId)
          if(index != -1){
            this.selectList.splice(index,1)
          }
        }
      })
      // if(this.selfBarList.barId != undefined &&this.selfBarList.barId != '' ){
      //   this.selectList.push(this.selfBarList.barId);
      // }
      let setProductList = [];
      this.goodsList.forEach(element => {
        setProductList.push({
          goldSalePrice: element.goodsPrice,
          sysProductId: element.id
        });
      });
      let parameter = {
        productList: setProductList,
        netbarIdList: this.selectList
      };
      if (this.configId !== 0) {
        parameter.id = this.configId;
      }
      if(this.selectList !=''){
        let res = await saveConfig(parameter);
        if (res.code == 200) {
          this.$emit("stepGo", { step: 4 });
        }else{
          maskCom({
            txt:[res.msg]
          })
        }
      }else{
        maskCom({
          txt:['请勾选网吧配置']
        })
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
  opacity: 0.5;
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
.content-fr {
  width: 230px;
  height: 524px;
  background: rgba(18, 20, 23, 1);
  border: 1px solid rgba(49, 56, 70, 1);
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
  padding: 20px 12px;
  text-align: left;
  .fr-title {
    font-size: 18px;
    margin-bottom: 36px;
  }
  .fr-content-tip {
    font-size: 16px;
    margin-bottom: 20px;
    &:nth-of-type(2) {
      margin-top: 26px;
    }
  }
  .convert-checkbox {
    margin-bottom: 12px;
    p {
      width: 88px;
      display: inline-block;
      margin-right: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    label {
      min-width: 70px;
      display: inline-block;
    }
  }
}
</style>


