<template>
    <div class="maskCon pf pr" v-if="isShow" id="maskCon" ref="maskCon">
          <div class="pa bigImgCon center pr" v-show="isShowMsg">
            <div class="closeIcon pa f18 cp" @click="closeImgFn">×</div>
            <img src="../../assets/img/background/pubg.png" alt="">
          </div>
          <div class="inMaskCon pa center pr"  v-show="tips1">
            <div class="closeIcon pa f18 cp hide" @click="closeFn">×</div>
            <div class="container tac">
              <div>
                <h4 class="f20">比赛即将开始，请设置以下步骤，以保障比赛正常开始！</h4>
                <div class="inContent tal pr " :class="{active: isSlect1 }">
                  <p class="f14">重启您的绝对求生（吃鸡）有游戏</p>
                  <p class="f12">*务必开启游戏加速器，推荐加速器</p>
                  <div class="tips1 topCenter pa line">1</div>
                  <i class="triggle pa topCenter"></i>
                  <div class="pa selectCon f14 topCenter" @click.stop="selectFn(1)">
                    <i class="pr"><b class="f12 pa center">✔</b></i>
                    已准备
                  </div>
                </div>
                <div class="inContent tal pr "  v-show="isSlect1"  :class="{active: isSlect2 }">
                  <p class="f14">请确保您的游戏在没有任何遮挡的正常大厅界面</p>
                  <p class="f12 cp" @click="lookMaxImg">*点击查看正常大厅界面截图</p>
                  <div class="tips1 topCenter pa line">2</div>
                  <i class="triggle pa topCenter"></i>
                  <div class="pa selectCon f14 topCenter" @click.stop="selectFn(2)">
                    <i class="pr"><b class="f12 pa center">✔</b></i>
                    已准备
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['gameRoomName','gameRoomPwd'],
    data(){
        return{
            isShow:true,
            date:'',
            tips1:true,
            tips2:false,
            selectIndex:0,
            isSlect1:false,
            isSlect2:false,
            isSlect3:false,
            isSlect4:false,
            isSlect5:false,
            isSlect6:false,
            isSlect7:false,
            roomname:'',
            password:'',
            minutes:5,
            seconds:0,
            roomMsg:'复制',
            pwdMsg:'复制',
            isShowMsg:false,
            params:{
                gameRoomName:'',
                gameRoomPwd:'',
                surFn:''
            }
        }
    },
    watch: {
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
          if(i == 1){
            window.$nuxt.$store.dispatch('toClient/sendMsg',{type:7,data:{'step':i}})
          }else{
            this.isShow = false
            if(typeof this.params.surFn == 'function'){
              this.params.surFn()
            }
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
                _this.tips2 = false
                _this.isShow = false
                _this.$emit('update',3)
                window.$nuxt.$store.dispatch('toClient/sendMsg',{type:8,data:{'msg':'5分钟倒计时结束比赛开始'}})
              } else {
                _this.seconds -= 1
              }
            }, 1000)
        },
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
    margin: 32px 0 24px 0;
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
