<template>
    <div class="maskCon pf pr" v-if="isShow" id="maskCon" ref="maskCon">
        <div class="inMaskCon pa center pr">
            <div class="closeIcon pa f18 cp" @click="closeFn">×</div>
            <h4 class="tac f16" v-show="titleList[params.type].txt !='' && titleList[params.type].txt != undefined">{{titleList[params.type].txt}}</h4>
            <div class="content tac clearfix f14">
              <div v-if="params.type == 1">
                <p>加入本场比赛需要支付：</p>
                <p class="f14"><i class="diamondIcon "></i>x<b class="f16" style="margin-left:6px;">{{params.priceNum}}</b></p>
              </div>
              <div v-else-if="params.type == 0" class="f14 tal">
                <p><span class="setWid tar">您要绑定的角色名为：</span><b class="mainCol">{{params.userGameName}}</b></p>
                <p><span class="setWid tar">您要绑定的游戏为：</span><b class="mainCol">{{params.gameName}}</b></p>
              </div>
              <div v-else-if="params.type == 2" class="tal f14" style="padding-bottom:10px;">
                <!-- <p v-show="!params.isShowTime" v-if="isShowTips" class="tac f32 mainCol" style="padding:20px 0; ">{{minutes}}:{{second}}</p> -->
                <!-- <p v-show="!params.isShowTime" v-else class="tac f32 mainCol " style="padding:20px 0; ">比赛已经开始</p> -->
                <p class="tac f32 mainCol" style="margin:20px 0;" v-show="params.title">{{params.title}}</p>
                <p>
                    <span style="margin-bottom:10px;width:100px;display:inline-block;">游戏房间名：</span>
                    <b class="whiteCol">{{params.roomName}}</b>
                    <span class="mainCol cp" v-show="params.roomName!='正在生成中，请稍后...'"
                            v-clipboard:copy="params.roomName"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">{{roomMsg}}</span>
                </p>
                <p>
                    <span style="width:100px;display:inline-block;">房间密码：</span>
                    <b class="whiteCol">{{params.roomPsw}}</b>
                    <span class="mainCol cp" v-clipboard:copy="params.roomPsw"  v-show="params.roomPsw!='正在生成中，请稍后...'"
                            v-clipboard:success="onCopy2"
                            v-clipboard:error="onError2">{{pwdMsg}}</span>
                </p>
                <p class="howJoin tar"  v-show="params.roomPsw!='正在生成中，请稍后...'"><a @click="openUrl" href="javascript:;" style="margin-top:10px;color:rgba(164, 164, 164, 1);">如何加入游戏</a></p>
              </div>
              <div v-else-if="params.type == 3">
                <p>确定是否退出本场比赛：将扣除<b class="mainCol f14">20%</b>的手续费</p>
              </div>
              <div v-else-if="params.type == 4" class="passwordInputCon">
                  <p>输入房间密码：<input type="password" v-model="password" placeholder="请输入房间密码"></p>
              </div>
            </div>
            <div class="btnCon tac" v-show="params.firstBtnTxt !='' &&params.firstBtnTxt != undefined">
                <ul class="clearfix f12" >
                    <li class="fl rangeBtn cp" v-show="params.firstBtnTxt !='' && params.firstBtnTxt !=undefined" @click="firstBtnFn(password)">{{params.firstBtnTxt}}</li>
                    <li class="fl cancelBtn cp"  v-show="params.secBtnTxt !='' && params.secBtnTxt !=undefined"  @click="secBtnFn">{{params.secBtnTxt}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:true,
            password:'',
            isShowClose:false,
            params:{
                title:'',
                type:1,
                userName:'',
                kills:'12',
                rank:10,
                priceNum:'',
                firstBtnTxt:'关闭',
                firstBtnFn:'',
                secBtnTxt:'',
                secBtnFn:'',
                roomName:'',
                roomPsw:'',
                timeoverFn:''
            },
            minutes:5,
            seconds:0,
            isShowTips:true,
            roomMsg:'复制',
            pwdMsg:'复制',
            titleList:{
              0:{
                txt:'请确定游戏角色'
              },
              1:{
                txt:'提示'  //加入比赛扣费提示
              },
              2:{
                txt:'游戏房间信息'
              },
              3:{
                txt:'提示' //退出比赛提示弹框
              },
              1:{
                txt:'提示'
              },
              4:{
                  txt:'提示'
              }
            }
        }
    },
    watch: {
      'params'(){
        this.timer()
      },
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    },
    methods:{
        openUrl(){
            let  host = window.location.host
            window.$nuxt.$store.dispatch("toClient/sendMsg", {
                type: 6,
                data: {
                msg: "打开外链",
                src: host+'/faq'
                }
            });
        },
        num(n){
          return n < 10 ? '0' + n : '' + n
        },
        timer(){
            var _this = this
            var time = window.setInterval(function () {
              if (_this.seconds === 0 && _this.minutes !== 0) {
                _this.seconds = 59
                _this.minutes -= 1
              } else if (_this.minutes === 0 && _this.seconds === 0) {
                _this.seconds = 0
                _this.isShowTips = false
                window.clearInterval(time)
                _this.params.isShowClose = true
                if(typeof  _this.params.timeoverFn == 'function'){
                    _this.params.timeoverFn()
                }
              } else {
                _this.seconds -= 1
              }
            }, 1000)
        },
        // 复制成功
        onCopy(e){
            this.roomMsg = '已复制'
        },
        // 复制失败
        onError(e){
            this.roomMsg = '复制失败'
        },
        // 复制成功
        onCopy2(e){
            this.pwdMsg = '已复制'
        },
        // 复制失败
        onError2(e){
            this.pwdMsg = '复制失败'
        },
        firstBtnFn(password) {
            this.isShow =false
            if(typeof this.params.firstBtnFn == 'function'){
                this.params.firstBtnFn(password)
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
        },
    }
}
</script>

<style scoped lang="scss">
.howJoin{
  margin-top: 10px;
  a{
    text-decoration: underline;
  }
}
.whiteCol{color: #fff;}
.goldIcon{vertical-align: middle; margin-left: 10px;}
.setWid{
  width: 160px;
  display: inline-block;
}
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
      min-width: 340px;
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
            padding: 20px 40px;
            color: #868686;
            p{
                margin: 5px 0;
            }
        }
        .btnCon{
            padding-bottom: 10px;
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
.diamondIcon{
  width: 16px;
  height: 16px;
  vertical-align: bottom;
  margin-right: 6px;
}
.passwordInputCon{
    color: #fff;
    input{
        width: 140px;
        padding:4px;
        line-height: 20px;
        border: 1px solid #B7B7B7;
        background: #13171D;
    }
}
</style>
