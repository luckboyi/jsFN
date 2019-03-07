<template>
    <modal-1 :show="show">
        <div class="modal-box" style="padding-bottom:20px;">
            <div class="modal-header">
                <span class="modal-title">
                    选择账号
                </span>
                <span class="close"
                    @click="close">×</span>
            </div>
            <div class="modal-body">
                <ul>
                    <li class="gray-border ells1"
                        :class="{'active':item.passportName==activeName}"
                        v-for="(item,index) in accList"
                        v-text="item.passportName"
                        @click="activeName=item.passportName" :key="index"></li>
                </ul>
                <!-- 登录入口 -->
                <div style="margin-top:20px;">
                    <a class="login-btn"
                        :class="{'disable-orange-btn':activeName==='','orange-btn':activeName!==''}"
                        @click.prevent="login">验证登录</a>
                </div>
                
            </div>
        </div>
    </modal-1>
</template>
<script>
import Modal1 from '@/components/common/modal1'
import { mapActions } from 'vuex'
export default {
    props: {
        show: Boolean,
        accList:Array
    },
    watch:{
        show(){
            this.activeName=''
        }
    },
    data() {
        return {
            // accList: [{
            //     passportName: 'test1'
            // }, {
            //     passportName: 'test2'
            // }, {
            //     passportName: 'test3'
            // }],
            activeName:''
        }
    },
    components: {
        Modal1
    },
    methods: {
        login(){
            if(this.activeName==='') return ;
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/components/loginBox.scss";

.modal-body {
    li {
        padding-left: 12px;
        padding-right: 12px;
        text-align: center;
        transition: all .3s;
        cursor: pointer;
        position: relative;
        &:before{
            content: '';
            display: block;
            width: 12px;
            height: 11px;
            position: absolute;
            right: 0;
            bottom:0;
            background: rgba(241, 161, 22, 1);
            opacity: 0;
            transition: all .2s;
        }
        &:hover{
            border-color:rgba(241,161,22,1);
        }
    }
    li.active{
        border-color:rgba(241,161,22,1);
        &:before{
            opacity: 1;
        }
    }
}
</style>


