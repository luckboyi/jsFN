<template>
    <div>
        <modal-1 :show="visible">
            <div class="modal-box" style="padding-bottom:20px;">
                <div class="modal-header">
                    <span class="modal-title">
                        图形验证
                    </span>
                    <span class="close"
                        @click="hide">×</span>
                </div>
                <div class="modal-body">
                    <!-- 图形验证码 -->
                    <div class="msg-box">
                        <div class="gray-border">
                            <input placeholder="请输图形验证码"
                                style="padding-left:8px;"
                                @keyup.enter="next"
                                v-model="imgCode" />
                        </div>
                        <img :src="imgSrc"
                            @click="changImgSrc"
                            style="width:80px;height:30px;margin-left:10px;cursor:pointer;" />
                    </div>
                    <div class="wrong-msg"
                        style="min-height:16px;">
                        <!-- 错误提示 -->
                        <span class="text-red"
                            ref="wrongMsg"
                            v-text="wrongTxt"></span>
                        <!-- 成功提示 -->
                        <span class="text-green"
                            v-text="successTxt"></span>
                    </div>
                    <!-- 登录入口 -->
                    <div>
                        <a class="login-btn orange-btn"
                            @click.prevent="next">下一步</a>
                    </div>
                </div>
            </div>
        </modal-1>
    </div>
</template>
<script>
import Modal1 from '@/components/common/modal1'
import validateCenter from '@/assets/utils/validateCenter'
import {WEB_API} from '@/assets/config/api'

export default {
    props:{
        imgsrc:String
    },
    components: {
        Modal1
    },
    data() {
        return {
            visible: false,
            wrongTxt: '',
            successTxt: '',
            imgCode: '',
            imgSrc: WEB_API.login.imgCode,
        }
    },
    watch: {
        visible() {
            this.changImgSrc()
        }
    },
    methods: {
        changImgSrc() {
            this.imgCode=''
            this.imgSrc = `${this.imgsrc}?${new Date().getTime()}`
        },
        setWrongTxt(txt) {
            this.successTxt = ''
            this.wrongTxt = txt
            this.$domFn.shake(this.$refs.wrongMsg)
        },
        show() {
            this.successTxt = ''
            this.wrongTxt = ''
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        next() {
            let vdtObj=validateCenter.imgCode(this.imgCode)
            if(!vdtObj.res) return this.setWrongTxt(vdtObj.msg)
            this.$emit('submit',this.imgCode)
        },
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/components/loginBox.scss";
</style>

