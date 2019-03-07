<template>
    <div class="maskCon pf pr" v-if="isShow" id="maskCon" ref="maskCon">
        <div class="inMaskCon pa center pr">
            <div v-show="!params.isShowColoseBtn" class="closeIcon pa f18 cp" @click="closeFn">×</div>
            <h4 class="tac f16" >{{params.title}}</h4>
            <div class="content tac f14">
                <p v-for="(item,index) in params.txt" :key="index">{{item}}</p>
            </div>
            <div class="btnCon tac">
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
    data(){
        return{
            isShow:true,
            params:{
                title:'',
                txt:[''],
                firstBtnTxt:'',
                secBtnTxt:'',
                firstBtnFn:'',
                secBtnFn:'',
                isShowColoseBtn:false
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
.maskCon{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top:0;
    left: 0;
    z-index: 99999;
    .inMaskCon{
        width: 348px;
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
            padding: 40px;
            p{
                margin: 5px 0;
            }
        }
        .btnCon{
            padding-bottom: 20px;
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
