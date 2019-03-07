<template>
  <div v-show="newsDetail !='' && newsDetail !=null">
      <p class="nav">
        <nuxt-link 
          to="/news" 
          v-show="newsDetail.type==1">
          公告
        </nuxt-link>
        <nuxt-link to="/news" 
          v-show="newsDetail.type!=1">新闻
        </nuxt-link><b>/</b>
        <b v-show="newsDetail.title !=''"
          v-text="newsDetail.title">
        </b>
      </p>
      <div>
        <div class="inNewDetailCon">
            <div class="title tac">
                <h2 class="tac f20" v-show="newsDetail.title !=''" v-text="newsDetail.title"></h2>
                <p class="time f12" v-show="newsDetail.createTime !=''" v-text="newsDetail.createTime"></p>
            </div>
            <div class="content f14">
                <div  v-html="newsContent">
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props:['newsDetail','newsContent'],
  data(){
    return{
      newsMsg:''
    }
  },
  filters:{
        formatDate(time){
            var d = new Date(time);
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
        }
    },
    
}
</script>

