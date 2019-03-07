<template>
    <modal-1 :show="show">
        <div style="width:600px;height:450px;background:#fff;overflow:hidden;position:relative;">
            <span class="close" @click.prevent="close">×</span>
            <iframe v-if="src!=''" :src="src" width="100%" height="100%" style="padding-top:40px;"></iframe>
        </div>
    </modal-1>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Modal1 from '@/components/common/modal1'
export default {
    components:{
        Modal1
    },
    data(){
        return {
            // show:true,
            // src:'http://www.baidu.com'
        }
    },
    computed:{
        ...mapState({
            show:state=>state.pay.wxModalShow,
            src:state=>state.pay.wxModalSrc
        })
    },
    methods:{
        ...mapActions([
            'pay/actionHideWxModal'
        ]),
        close(){
            this['pay/actionHideWxModal']()
        }
    }
}
</script>
<style lang="scss" scoped>
.close{
    position: absolute;
    font-size:24px;
    top:4px;
    right:12px;
    cursor: pointer;
}
</style>


