<template>
    <div style="padding-top:2px;">
        <img src="~assets/img/loading/loading.gif" v-if="loading" style="width:50px;display:block;margin:auto;margin-top:10px;" alt="加载中...">
        <div @click="getMoreData"
            class="more-button"
            style="margin:auto;"
            v-show="showButton">
            点击加载更多
        </div>
        <!-- <div v-show="showBottom"
            style="color:rgba(203, 203, 203, 0.9);text-align:center;padding-top:30px;">
            ------------------------- 我们是有底线的 -------------------------
        </div> -->
    </div>
</template>

<script>
export default {
    props:{
        loading:Boolean,
        showButton:Boolean,
        showBottom:Boolean
    },
    methods:{
        getMoreData(){
            this.$emit('getMoreData')
        }
    }
}
</script>

<style lang="scss" scoped>
.more-button {
  display: block;
  background:rgba(29,32,41,1);
  text-align: center;
  height: 40px;
  color:rgba(248,248,248,1);
  line-height: 40px;
  cursor: pointer;
  transition: all .3s;
  &:hover{
    color:rgba(248,248,248,1);
    background:rgba(47,53,66,1);
  }
}
</style>


