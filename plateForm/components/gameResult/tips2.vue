<template>
    <div class="maskCon pf pr"  v-if="params.isShow" id="maskCon" ref="maskCon">
        <div class="inMaskCon tips2Con pa center pr tac">
          <div class="closeIcon pa f18 cp " @click="closeFn">×</div>
          <div v-if="params.type == 2">
            <h5 class="f20">请在10分钟内开始游戏，否则本场比赛会无法结算</h5>
            <!-- <div class="inCon f14">
              <div class="">
                <p class="time">倒计时</p>
                <p class="f32 mainCol">{{minutes}}:{{second}}</p>
              </div>
              <p>请在<b>倒计时为0时</b>在游戏中<b>开始比赛</b></p>
              <p>超过<b>3分钟</b>后比赛将会被取消</p>
            </div> -->
          </div>
          <div v-else>
            <h5 class="f20">请在10分钟内开始游戏，否则本场比赛会无法结算</h5>
            <!-- <div class="inCon f14">
              <div class="">
                <p class="time">倒计时</p>
                <p class="f32 mainCol">{{minutes}}:{{second}}</p>
              </div>
            </div> -->
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            selectIndex:0,
            roomname:'',
            password:'',
            minutes:5,
            seconds:0,
            roomMsg:'复制',
            pwdMsg:'复制',
            isShowMsg:false,
            isShow:false,
            params:{}
            // params:{
                
            // }
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
        closeImgFn(){
          this.isShowMsg =false
        },
        lookMaxImg(){
          this.isShowMsg =true
        },
      // 复制成功
        onCopy(e){
            this.roomMsg = '已复制'
            this.pwdMsg = '复制'
        },
        // 复制失败
        onError(e){
            this.roomMsg = '复制失败'
        },
        // 复制成功
        onCopy2(e){
            this.pwdMsg = '已复制'
            this.roomMsg = '复制'
        },
        // 复制失败
        onError2(e){
            this.pwdMsg = '复制失败'
        },
        selectFn(i){
          this.selectIndex = i
          var obj = 'isSlect'+i
          this[obj] = true
          if(i == 7){
            window.$nuxt.$store.dispatch('toClient/sendMsg',{type:7,data:{'step':i}})
          }
          if(this.isSlect7){
            this.tips1 = false
          }
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
                window.clearInterval(time)
                _this.isShow = true
                window.$nuxt.$store.dispatch('toClient/sendMsg',{type:8,data:{'msg':'5分钟倒计时结束比赛开始'}})
              } else {
                _this.seconds -= 1
              }
            }, 1000)
        },
        firstBtnFn() {
            _this.params.isShow =false
            if(typeof this.params.firstBtnFn == 'function'){
                this.params.firstBtnFn()
            }
        },
        secBtnFn() {
            _this.params.isShow =false
            if(typeof this.params.secBtnFn == 'function'){
                this.params.secBtnFn()
            }
        },
        closeFn(){
            this.params.isShow =false
        },
        getDateFn(data){
        }
    }
}
</script>

<style scoped lang="scss">
.goldIcon{vertical-align: middle; margin-left: 10px;}
.imgCon{
  margin-top:30px;
}
.tips2Con{
  width: 348px !important;
  h5{
    color: #D3D3D3;
    margin: 32px 0 24px 0;
    padding: 20px 0;
  }
  .inCon{
    color:#888888;
    padding-bottom: 30px;
    div{
      width: 160px;
      height: 80px;
      display: inline-block;
      background:rgba(41,48,58,0.5);
      margin-bottom: 30px;
      .time{
        margin: 10px 0 6px;
      }
    }
    b{
      background:rgba(40,46,56,1);
      color: #D3D3D3;
      padding: 0 4px;
    }
  }
}
.selectCon{
  line-height: 14px;
  right: -86px;
  i{
    width:14px;
    height:14px;
    border:1px solid rgba(166,166,166,1);
    border-radius:2px;
    vertical-align: bottom;
    margin-right: 10px;
  }
}
.margin{margin:0 !important; line-height: 60px;}
.triggle{
    width:0;
    height:0;
    border-width:10px 0 10px 10px;
    border-style:solid;
    border-color:transparent transparent transparent #5498FD;/*透明 透明 透明 灰*/
    left: -18px;
    display: none;
}
.tips1{
  width: 28px;
  height: 28px;
  line-height: 26px;
  border-radius: 100%;
  background:rgba(74,78,89,0.05);
  border:1px solid rgba(41,45,53,1);
  box-shadow:0px 0px 7px 0px rgba(245,240,241,0.5);
  left: -55px;
  text-indent: 0;
  text-align: center;
  position: relative;
  &.line::after{
    content: '';
    width: 1px;
    height: 40px;
    background: #262E3B;
    position: absolute;
    left: 50%;
    top: 34px;
  }
}
.container{
  h4{
    line-height: 48px;
    width: 538px;
    background:rgba(28,34,45,1); 
    display: inline-block;
    margin: 40px 0 12px;
  }
  .inContent{
    width:410px;
    height:60px;
    background:rgba(28,33,41,1);
    border:1px solid rgba(38,46,59,1);
    display: inline-block;
    text-indent: 10px;
    margin-bottom: 20px;
    .selectCon b{
      display: none;
    }
    &.active{
      .tips1 {
        background:rgba(44,80,171,0);
        box-shadow:0px 0px 20px  #5498FD  inset;
      }
      .selectCon i{
        background:rgba(255,255,255,.8);
        border-color: rgba(255,255,255,.8);

        b{
          left: 2px;
          color: #000;
          display: block;
        }
      }
      .triggle{
        display: block;
      }
    }
    .f14{
      margin: 10px 0 8px;
      color: #D3D3D3;
    }
    .f12{
      color: #888888;
    }
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
        width: 620px;
        background:rgba(19,23,29,.95);
        border:1px solid rgba(54,61,75,.95);
        border-radius:4px;
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
.bigImgCon{
  width: 800px;
  height: 450px;
  z-index: 99;
  img{
    width: 100%;
    height: 100%;
  }
  .closeIcon{
    width: 22px;
    background: #000;
    text-align: center;
  }
}

</style>
