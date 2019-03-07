<template>
    <div v-if="showLoginBox">
        <!-- 默认登录模态窗 -->
        <default-login :login-way='loginWay'></default-login>
        <!-- 维护大师登录模态窗 -->
        <whds-login :login-way='loginWay'></whds-login>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import DefaultLogin from './default'
import WhdsLogin from './whds'
export default {
    components:{
        DefaultLogin,
        WhdsLogin
    },
    computed:{
        ...mapState({
            showLoginBox:state=>state.login.showLoginBox,
            loginWay:state=>state.login.loginWay
        })
    }
}
</script>

