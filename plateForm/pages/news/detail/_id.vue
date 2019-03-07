<template>
<div>
  <div class="newsDetailCon w12">
        <loadingCom v-if="isShow"/>
        <newsDetailCom v-show="!isShow"  v-if="$store.state.user.basicInfo.nickName !=''"  :newsDetail="newsDetail" :newsContent="newsContent"/>
        <newsDetailCom v-show="!isShow"  v-if="$store.state.user.basicInfo.nickName ==''"  :newsDetail="newsDetail" :newsContent="newsContent"/>
  </div>
</div>
</template>
<script>
import {getNewsDetail} from '@/request/userNotice'
import loadingCom from '@/components/loading/index'
import newsDetailCom from '@/components/news/index'
export default {
  data() {
    return {
      newsDetail:{},
      current:1,
      size:10,
      newsContent:'',
      isShow:true
    }
  },
  beforeCreate() {
      this.isShow = true
  },
  components:{
    loadingCom,
    newsDetailCom
  },
  filters:{
        formatDate(time){
            var d = new Date(time);
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
        },
        html(str){
          
        }
    },
  mounted () {
    this.getDetail() 
  },
  methods: {
    async getDetail(){
      let res = await getNewsDetail(this.$route.params.id)
      if(res.code == 200){
        this.isShow =false
        this.newsDetail = res.data
        var htmlObj=document.createElement('div')
        htmlObj.innerHTML = res.data.content
        let content=htmlObj.innerText
       // htmlObj.remove()
        this.newsContent = content
      }
    },
  }
};
</script>
<style lang="scss" >
.nav{
  margin-bottom: 20px;
  b{
    margin: 0 10px;
  }
}
.newsDetailCon {
  .inNewDetailCon {
    padding: 46px 80px;
    background: rgba(36, 42, 53, 1);
    border: 1px solid rgba(53, 61, 77, 1);
    box-sizing: border-box;
  }
  .title {
    color: rgba(128, 128, 138, 1);
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    margin-bottom: 20px;
    h2 {
      color: rgba(255, 255, 255, 1);
      margin-bottom: 10px;
    }
  }
  .content {
    text-indent: 2em;
    color: rgba(202, 200, 200, 1);
    line-height: 26px;
    p {
      margin-bottom: 20px;
    }
  }
}
</style>

