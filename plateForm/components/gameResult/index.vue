<template>
    <div class="maskCon pf pr" v-if="isShow" id="maskCon" ref="maskCon">
        <div class="inMaskCon pa center pr">
            <div class="closeIcon pa f18 cp" @click="closeFn">×</div>
            <h4 class="tac f16" v-show="params.title !='' && params.title != undefined">{{params.title}}</h4>
            <div class="content  clearfix">
              <div class="fl imgCon">
                <img v-if="params.type == 1" src="../../assets/img/icon/suc.png" alt="">
                <img v-else src="../../assets/img/icon/fail.png" alt="">
              </div>
              <div class="fl tal inContent">
                <p> 亲爱的{{params.userName}},</p>
                <p> 恭喜您！</p>
                <p>您在房间ID：<b class="mainCol">{{params.roomId}}</b>比赛中获得了胜利</p>
                <p>您在游戏中获得了<b class="mainCol">{{params.kills}}击杀,排名{{params.rank}}位</b></p>
                <p>获得了：</p>
                <p class="mainCol f22">+ 8000<i class="goldIcon"></i></p>
              </div>
            </div>
            <div class="btnCon tac" v-show="params.firstBtnTxt !='' &&params.firstBtnTxt != undefined">
                <ul class="clearfix f12" >
                    <li class="fl rangeBtn cp" v-show="params.firstBtnTxt !='' && params.firstBtnTxt !=undefined" @click="firstBtnFn">{{params.firstBtnTxt}}</li>
                    <li class="fl cancelBtn cp"  v-show="params.secBtnTxt !='' && params.secBtnTxt !=undefined"  @click="secBtnFn">{{params.secBtnTxt}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components:{
      
    },
    data(){
        return{
            isShow:true,
            date:'',
            params:{
                type:1,
                title:'',
                userName:'',
                kills:'12',
                rank:10,
                firstBtnTxt:'关闭',
                secBtnTxt:'',
                firstBtnFn:'',
                secBtnFn:''
            }
        }
    },
    methods:{
        firstBtnFn() {
            this.isShow =false
            if(typeof this.params.firstBtnFn == 'function'){
                this.params.firstBtnFn()
            }
        },
        secBtnFn() {
            this.isShow =false
            if(typeof this.params.secBtnFn == 'function'){
                this.params.secBtnFn()
            }
        },
        closeFn(){
            this.isShow =false
        }
    }
}
</script>

<style scoped lang="scss">
.goldIcon{vertical-align: middle; margin-left: 10px;}
.imgCon{
  margin-top:30px;
}
.inContent{
  margin-left: 20px;
  color: #A7ACB4;
  p{
    line-height: 24px;
  }
}
.maskCon{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top:0;
    left: 0;
    z-index: 9999999999;
    .inMaskCon{
        min-width: 410px;
        background:rgba(19,23,29,.95);
        border:1px solid rgba(54,61,75,.95);
        border-radius:4px;
        h4{
            line-height:40px;
            height: 40px;
            background:linear-gradient(0deg,rgba(42,51,64,.4),rgba(16,21,32,1));
            border-radius:4px 4px 0px 0px;
        }
        .content{
            padding: 40px 40px 20px;
            border-bottom: 1px solid  #000000 ;
            p{
                margin: 5px 0;
            }
        }
        div.btnCon{
          border-top: 1px solid rgba(54, 61, 75, 1);
        }
        .btnCon{
            padding-top: 20px;
            
            ul{
                display: inline-block;
                li{
                    line-height: 30px;
                    margin: 0 10px;
                    padding:0 10px;
                    min-width: 80px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    &.cancelBtn{
                      border:1px solid rgba(183,183,183,1);
                      color:rgba(183,183,183,1);
                      &:hover{
                          background: rgba(183,183,183,1);
                          color: #fff;
                      }
                    }
                }
            }
        }
    }
}
.closeIcon{
    color: #a9a9a9;
    right: 10px;
    top: 6px;
    &:hover{
        color: #d3d3d3;
    }
}
</style>
