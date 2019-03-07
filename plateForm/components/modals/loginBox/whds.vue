<template>
    <div>
        <!-- 默认形式登录 -->
        <modal-1 :show="loginWay==1">
            <div class="modal-box">
                <div class="modal-header">
                    <span class="modal-title">
                        维护大师登录
                    </span>
                    <span class="close"
                        @click="close">×</span>
                </div>
                <div class="modal-body">
                    <!-- 账号 -->
                    <div class="phone-box">
                        <div class="gray-border">
                            <span class="iconBox">
                                <i class="icon-user"></i>
                            </span>
                            <input v-model="passportName"
                                ref="passport"
                                placeholder="请输入账号" />
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class="phone-box">
                        <div class="gray-border">
                            <span class="iconBox">
                                <i class="icon-password"></i>
                            </span>
                            <input v-model="password"
                                type="password"
                                placeholder="请输入密码" />
                        </div>
                    </div>
                    <!-- 短信验证码 -->
                    <div class="msg-box">
                        <div class="gray-border">
                            <span class="iconBox">
                                <i class="icon-yzm"></i>
                            </span>
                            <input v-model="smsCode"
                                @keyup.enter="login"
                                placeholder="请输入短信验证码" />
                        </div>
                        <!-- 获取短信验证码 -->
                        <a href="#"
                            class="sms-btn"
                            @click.prevent="getSmsCode()">
                            <count-down ref="smsCodeBtn"
                                :time="300"
                                :content="'发送验证码'"></count-down>
                        </a>
                    </div>
                    <!-- 错误提示 -->
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
                            v-if="!loginLoading"
                            @click.prevent="login">验证登录</a>
                        <a class="login-btn disable-orange-btn"
                            v-if="loginLoading">
                            <span>登录中</span>
                            <img src="~assets/img/loading/loading.gif"
                                style="width:40px;vertical-align:middle;position:absolute;top:0px;right:24px;"
                                alt="加载中...">
                        </a>
                    </div>
                    <div class="phone-login">
                        <a href="#"
                            @click.prevent="loginForPhone">手机快捷登录</a>
                    </div>
                </div>
            </div>
        </modal-1>
        <img-code ref="imgCode"
            :imgsrc="imgCodeSrc"
            @submit="getSmsCode"></img-code>
    </div>

</template>

<script>
import { mapActions } from 'vuex'
// 组件
import Modal1 from '@/components/common/modal1'
import CountDown from '@/components/common/countDown'
import validateCenter from '@/assets/utils/validateCenter'
import ImgCode from './imgCode'

// request
import {
    applayForWhdsLogin,
    getLoginSmsCodeWhds,
} from '@/request/login'

export default {
    name: 'loginBox',
    props: {
        loginWay: Number
    },
    components: {
        Modal1,
        CountDown,
        ImgCode
    },
    data() {
        return {
            loginLoading: false,
            passportName: '',
            password: '',
            imgCode: '',
            needImgCode: '',
            smsCode: '',
            wrongTxt: '',
            successTxt: '',
            imgCodeSrc: WEB_API.login.img_code
        }
    },
    watch: {
        loginWay() {
            if (this.loginWay == 1) {
                setTimeout(() => {
                    this.$refs.passport.focus()
                }, 300)
            }
            this.loginLoading =false
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions([
            'login/actionHideLoginBox',
            'login/actionLoginSuccess',
            'login/actionSelectLoginPwd',
            'login/actionSelectLoginWay',
        ]),
        loginForPhone() {
            this['login/actionSelectLoginWay'](0)
        },
        close() {
            this['login/actionHideLoginBox']()
        },
        // 显示图形验证码弹窗
        showImgCode() {
            this.wrongTxt = ''
            this.$refs.imgCode.show()
        },
        async getSmsCode(verifyCode) {
            // 若处于倒计时状态
            if (this.$refs.smsCodeBtn.isActive()) return false
            // 验证输入
            if (!this.checkForm()) return false
            // 请求短信验证码
            let res = await getLoginSmsCodeWhds({
                passportName: this.passportName,
                password: this.password,
                verifyCode: verifyCode ? verifyCode : ''
            })
            if (res.code == 200) {
                // 请求成功
                this.wrongTxt = ''
                this.successTxt = res.msg
                this.$refs.imgCode.hide()
            } else if (res.code == 401) {
                this.needImgCode = true
                return this.showImgCode()
            } else {
                // 请求失败
                if (this.needImgCode) {
                    return this.$refs.imgCode.setWrongTxt(res.msg)
                } else {
                    return this.setWrongTxt(res.msg)
                }
            }
            // 倒计时开始
            this.$refs.smsCodeBtn.start()
        },
        // 设置错误信息
        setWrongTxt(txt) {
            this.successTxt = ''
            this.wrongTxt = txt
            this.$domFn.shake(this.$refs.wrongMsg)
        },
        checkForm() {
            // 校验通行证账号
            let vdtObj = validateCenter.passportNameWhds(this.passportName)
            if (!vdtObj.res) {
                this.setWrongTxt(vdtObj.msg)
                return false
            }
            // 校验密码
            vdtObj = validateCenter.passwordWhds(this.password)
            if (!vdtObj.res) {
                this.setWrongTxt(vdtObj.msg)
                return false
            }
            return true
        },
        async login() {
            this.wrongTxt = ''
            this.successTxt = ''
            // 校验通行证账号
            if (!this.checkForm()) return
            // 校验短信验证码
            let vdtObj = validateCenter.smsCode(this.smsCode)
            if (!vdtObj.res) return this.setWrongTxt(vdtObj.msg)
            // 后台登录校验
            this.loginLoading = true
            let res = await applayForWhdsLogin({
                passportName: this.passportName,
                password: this.password,
                smsCode: this.smsCode
            })
            if (res.code != 200) {
                this.loginLoading = false
            }
            // 返回校验错误信息
            if (res.code == 400) {
                return this.setWrongTxt(res.msg)
            }
            // 需要短信验证码
            if (res.code == 401) {
                this.showImgCode()
                this.wrongTxt = ''
                this.successTxt = res.msg
            }
            // 登录成功
            if (res.code == 200){
                
                this['login/actionLoginSuccess'](this.smsCode)
                this['login/actionSelectLoginWay'](1)
                this['login/actionSelectLoginPwd'](this.password)

            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/components/loginBox.scss";
.login-btn {
    margin-bottom: 8px;
}
.phone-login {
    text-align: center;
    margin-bottom: 30px;
    a {
        text-decoration: underline;
    }
}
</style>

