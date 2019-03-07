<template>
    <div class="w12 teamCon">
        <ul class="clearfix teamNav f18 tac">
            <li v-if="$store.state.user.basicInfo.nickName !=''" class="fl cp">
                <nuxt-link :to="'/team/teamList'">战队</nuxt-link>
            </li>
            <li v-if="$store.state.user.basicInfo.nickName ==''" class="fl cp">
                <nuxt-link :to="'/team/teamList'">战队</nuxt-link>
            </li>
            <li v-if="$store.state.user.basicInfo.nickName !=undefined && $store.state.user.basicInfo.nickName !=''" class="fl cp">
                <nuxt-link :to="'/team/myTeam'">我的战队</nuxt-link>
            </li>
            <li v-if=" $store.state.user.basicInfo.team == null && $store.state.user.loginState"  class="fl cp">
                <nuxt-link :to="'/team/createTeam'">创建战队</nuxt-link>
            </li>
        </ul>
        <nuxt-child :key="$route.params.id" />
    </div>
</template>
<script>

export default {
    data() {
        return {
            navIndex:0,
        }
    },
    computed:{
    },
    methods:{
        navClick (i) {
            this.navIndex = i
        },
        
    }
}
</script>
<style lang="scss" scoped>
    .teamCon{
    }
    .teamNav{
        margin-bottom: 20px;
        li a{
            display:block;
            padding:0 16px 10px;
            border-bottom: 3px solid rgba(0,0,0,0);
            margin-right: 20px;
            color: rgba(255,255,255,.5);
            &:hover{
                color:#34b2fa;
            }
        }
        li a.nuxt-link-active{
            color:#34b2fa;
            border-color:  #34b2fa;
        }
        
    }
</style>

