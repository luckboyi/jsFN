<template>
    <modal-1 :show="show">
        <div class="modal-box"
            style="width:510px;">
            <div class="modal-header"
                style="text-align:left;text-indent:1em;">
                <span class="modal-title"
                    style="font-size:14px;">

                </span>
                <span class="close"
                    @click="close">×</span>
            </div>
            <div class="modal-body"
                style="width:460px;">
                <div class="row">
                    <span>规则：</span>
                    <div v-html="ruleDataVal.rule"></div>
                </div>
                <div class="row">
                    <span>奖励：</span>
                    <div v-html="ruleDataVal.reward"></div>
                </div>
            </div>
        </div>
    </modal-1>
</template>

<script>
import Modal1 from '@/components/common/modal1'
// request
import {
    getGameRuleReward
} from '~/request/game'

export default {
    props: {
        // show: Boolean,
    },
    components: {
        Modal1
    },
    data() {
        return {
            show:false,
            ruleData:''
        }
    },
    computed: {
        ruleDataVal(){
            if(this.ruleData===''){
                return {
                    rule:'',
                    reward:''
                }
            }
            if(this.ruleData != undefined){
            var  res=this.ruleData.split('|')
                if(res.length==1){
                    return {
                        rule:res[0].replace(/\\n/g,'<br/>'),
                        reward:''
                    }
                }else{
                    return {
                        rule:res[0].replace(/\\n/g,'<br/>'),
                        reward:res[1].replace(/\\n/g,'<br/>')
                    }
                }
            }
            

        }
    },
    methods: {
        close() {
            this.show=false
        },
        async showGameRuleReward(ruleData) {
            this.ruleData=ruleData
            this.show=true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/basicColor.scss";
.modal-body {
    padding-bottom: 20px;
    color: $white;
}
.row {
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 10px;
    > span {
        float: left;
        width: 44px;
        color: $yellow;
    }
    > div {
        float: left;
        width: 416px;
        color: $white;
        line-height: 20px;
    }
}
</style>


