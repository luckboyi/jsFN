<template>
    <div class="personalCenter w12">
        <infoCom :basicInfo="basicInfo"/>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import infoCom from '@/components/personalInfo/info'
export default {
    data(){
        return{
        }
    },
    mounted(){
    },
    computed:{
        ...mapState({
            basicInfo:state=>state.user.basicInfo
        })
    },
    components:{
        infoCom
    }
}
</script>
<style lang="scss" scoped>

</style>
