<template>
  <div v-if="isShow" id="shopConfigFirst" ref="shopConfigFirst">
    <config-header
      :headerText="headerText"
      :selectProductsNum="selectProductsNum"
      :allProductsNum="fruits.length"
      :showInput="true"
    ></config-header>
    <div class="config-content">
      <div class="fl content-fl">
        <ul>
          <li v-for="(fruit, index) in fruits" :key="index" :class="{'bg-blue':fruit.state}">
            <p :title="fruit.productName">{{fruit.productName}}</p>
            <img :src="fruit.productImgUrl" alt>
            <div class="convert-checkbox">
              <input
                type="checkbox"
                :checked="fruit.id>=0"
                name="checkboxinput"
                class="input-checkbox"
                @click="checkedOne(fruit.id)"
                v-model="fruit.state"
                :id="fruit.id"
              >
              <label :for="fruit.id">
                <span v-if="!fruit.state">选择</span>
                <span v-else>已选择</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="config-btn confirm" @click="goStepTwo()">下一步</div>
  </div>
</template>
<script>
import configHeader from "~/components/shop/configHeader";
export default {
  props: {
    isShow: Boolean,
    fruits: Array,
  },
  components: {
    configHeader
  },
  data() {
    return {
      headerText: "1:选择上架商品",
      fruitIds: [],
      selectProductsNum: 0
    };
  },
  computed: {
    // ...mapState({
    //   canCreateMatch: state => state.user.basicInfo.canCreateMatch
    // })
  },
  mounted() {},
  watch: {
    fruits(){
      this.fruits.forEach(el => {
        if(el.state){
          this.fruitIds.push(el.id)
          this.selectProductsNum+=1
        }
      })
    }
  },
  methods: {
    checkedOne(fruitId) {
      //选中该checkbox
      let idIndex = this.fruitIds.indexOf(fruitId);
      if (idIndex >= 0) {
        // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
        this.fruitIds.splice(idIndex, 1);
      } else {
        this.fruitIds.push(fruitId);
      }
      this.selectProductsNum = this.fruitIds.length;
    },
    goStepTwo() {
      let goodsList = [];
        this.fruits.forEach(element => {
          if(element.state){
            goodsList.push(element)
          }
          // this.fruitIds.forEach(i => {
          //   if (element.id == i) {
          //     goodsList.push(element);
          //   }
          // });
        });
        this.$store.commit("shop/setProducData", {
          selectNum: this.selectProductsNum,
          allNum: this.fruits.length
        });
        this.$emit("stepGo", { data: goodsList, step: 2 });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/shop/config.scss";
.content-fl {
  li {
    margin-right: 13px !important;
    > p {
      max-width: 100%;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    > img {
      margin-top: 5px !important;
    }
  }
}
</style>


