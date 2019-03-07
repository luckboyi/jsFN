

<template>
  <div>
    <!-- 默认形式登录 -->
    <modal-1 :show="loginWay==0">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">登录</span>
          <span class="close" @click="close">×</span>
        </div>
        <div class="modal-body">
          <!-- 手机号 -->
          <div class="phone-box">
            <div class="gray-border">
              <span class="iconBox">
                <i class="icon-phone"></i>
              </span>
              <span class="prefix">+86 |</span>
              <input
                placeholder="请输入手机号码"
                ref="phone"
                v-model="phoneNum"
                style="padding-left:82px;padding-right:8px;"
              >
            </div>
          </div>
          <!-- 短信验证码 -->
          <div class="msg-box">
            <div class="gray-border">
              <span class="iconBox">
                <i class="icon-yzm"></i>
              </span>
              <input placeholder="请输入短信验证码" @keyup.enter="login" v-model="smsCode">
            </div>
            <a href="#" class="sms-btn" @click.prevent="getSmsCode()">
              <count-down ref="smsCodeBtn" :time="300" :content="'发送验证码'"></count-down>
            </a>
          </div>
          <div class="agreement-box" style="color:rgba(169,169,169,1);">
            <img
              src="~assets/img/icon/icon-checked.png"
              @click="agreeState=!agreeState"
              v-show="agreeState"
              style
            >
            <img
              src="~assets/img/icon/icon-check.png"
              @click="agreeState=!agreeState"
              v-show="!agreeState"
            > 同意
            <a href="javascript:;" @click="openUrl" :class="{'active':agreeState}">
              《
              <span>用户注册协议</span>》
            </a>
          </div>
          <div class="wrong-msg" style="min-height:16px;">
            <!-- 错误提示 -->
            <span class="text-red" ref="wrongMsg" v-text="wrongTxt"></span>
            <!-- 成功提示 -->
            <span class="text-green" v-text="successTxt"></span>
          </div>
          <!-- 登录入口 -->
          <div>
            <a class="login-btn orange-btn" v-if="!loginLoading" @click.prevent="login">
              <span>验证登录</span>
              <img
                src="~assets/img/loading/loading.gif"
                style="width:50px;display:block;margin:auto;margin-top:10px;"
                alt="加载中..."
              >
            </a>
            <a class="login-btn disable-orange-btn" v-if="loginLoading">
              <span>登录中</span>
              <img
                src="~assets/img/loading/loading.gif"
                style="width:40px;vertical-align:middle;position:absolute;top:0px;right:24px;"
                alt="加载中..."
              >
            </a>
          </div>
          <div class="line login-way-line">
            <div>其他登录方式</div>
          </div>
          <!-- 其他登录 -->
          <div class="login-way">
            <img src="~assets/img/icon/whds-logo.png" @click="loginForWhds">
            <!-- <span>维护大师登录</span> -->
          </div>
        </div>
      </div>
    </modal-1>
    <img-code ref="imgCode" :imgsrc="imgCodeSrc" @submit="getSmsCode"></img-code>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal1 from "@/components/common/modal1";
import ImgCode from "./imgCode";
import CountDown from "@/components/common/countDown";
import validateCenter from "@/assets/utils/validateCenter";

// request
import { getLoginSmsCode, applyForDefaultLogin } from "@/request/login";

export default {
  name: "loginBox",
  props: {
    loginWay: Number
  },
  components: {
    Modal1,
    CountDown,
    ImgCode
  },
  watch: {
    // 设置初始状态
    loginWay() {
      this.loginLoading = false;
      this.agreeState = true;
      this.phoneNum = "";
      this.imgCode = "";
      this.smsCode = "";
      this.wrongTxt = "";
      this.successTxt = "";
      this.$refs.smsCodeBtn.reset();
      if (this.loginWay == 0) {
        setTimeout(() => {
          this.$refs.phone.focus();
        }, 300);
      }
    },
    "$store.state.fromClient.clll_login_result"() {
      if (this.$store.state.fromClient.clll_login_result == 2) {
        maskCom({
          txt: ["云端登录失败!"]
        });
      }
    }
  },
  data() {
    return {
      agreeState: true, //用户协议是否勾选
      phoneNum: "", //手机号码
      imgCode: "", //图片验证码
      needImgCode: false, //是否需要图形验证码的状态
      smsCode: "", //短信验证码
      wrongTxt: "", //错误内容
      successTxt: "", //成功内容
      imgCodeSrc: WEB_API.login.img_code, //图形验证码地址
      loginLoading: false
    };
  },
  mounted() {},
  methods: {
    openUrl() {
      let host = window.location.host;
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 6,
        data: {
          msg: "打开外链",
          src: host + "/agreement"
        }
      });
    },
    ...mapActions([
      "login/actionHideLoginBox",
      "login/actionSelectLoginWay",
      "login/actionLoginSuccess"
    ]),
    close() {
      this["login/actionHideLoginBox"]();
    },
    // 切换维护大师登录
    loginForWhds() {
      this["login/actionSelectLoginWay"](1);
    },
    // 设置错误信息
    setWrongTxt(txt) {
      this.successTxt = "";
      this.wrongTxt = txt;
      this.$domFn.shake(this.$refs.wrongMsg);
    },
    // 手机校验
    validatePhoneNum() {
      let vldObj = validateCenter.phoneNum(this.phoneNum);
      if (!vldObj.res) {
        this.setWrongTxt(vldObj.msg);
        return false;
      }
      return true;
    },
    // 登录校验
    validateLogin() {
      // 校验手机号
      if (!this.validatePhoneNum()) return false;
      // 校验短信验证码
      let vldObj = validateCenter.smsCode(this.smsCode);
      if (!vldObj.res) {
        this.setWrongTxt(vldObj.msg);
        return false;
      }
      // 校验通过
      return true;
    },
    async login() {
      // 清空提示消息
      this.successTxt = "";
      this.wrongTxt = "";
      // 登录校验
      let res = this.validateLogin();
      if (!res) return;
      if (!this.agreeState) {
        return this.setWrongTxt("请同意注册协议");
      }
      // 登录后台请求
      this.loginLoading = true;
      res = await applyForDefaultLogin({
        phone: this.phoneNum,
        smsCode: this.smsCode
      });

      // 登录失败
      if (res.code == 400) {
        this.loginLoading = false;
        return this.setWrongTxt(res.msg);
      }
      if (res.code != 200) {
        this.loginLoading = false;
      }
      // 登录成功

      if (res.code == 200) {
        this["login/actionLoginSuccess"](this.smsCode);
      }
    },
    showImgCode() {
      this.$refs.imgCode.show();
    },
    // 获取短信验证码
    async getSmsCode(verifyCode) {
      this.wrongTxt = "";
      // 若处于倒计时状态
      if (this.$refs.smsCodeBtn.isActive()) return false;
      // 校验手机号
      if (!this.validatePhoneNum()) return false;
      // 请求短信验证码
      let res = await getLoginSmsCode({
        phone: this.phoneNum,
        verifyCode: verifyCode ? verifyCode : ""
      });
      if (res.code == 200) {
        // 请求成功
        this.wrongTxt = "";
        this.successTxt = res.msg;
        this.$refs.imgCode.hide();
      } else if (res.code == 401) {
        this.needImgCode = true;
        return this.showImgCode();
      } else {
        // 请求失败
        if (this.needImgCode) {
          return this.$refs.imgCode.setWrongTxt(res.msg);
        } else {
          return this.setWrongTxt(res.msg);
        }
      }
      // 倒计时开始
      this.$refs.smsCodeBtn.start();
    },
    // 关闭选择维护大师账号窗口
    closeSelectWhdsBox() {
      // 关闭选择账号窗口
      this.selectWhds.selectBoxState = false;
      // 关闭登录方式的窗口
      this["login/actionSelectLoginWay"](null);
      // 关闭登录的悬浮层
      this["login/actionHideLoginBox"]();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/components/loginBox.scss";
@import "~assets/style/basicColor.scss";
.msg-box {
  height: 40px;
}
.agreement-box {
  padding-bottom: 10px;
  img {
    position: relative;
    top: 2px;
    cursor: pointer;
  }
  a {
    transition: all 0.3s;
    span {
      transition: all 0.3s;
      text-decoration: underline;
      color: $blue;
    }
    &:hover {
      color: rgba(164, 164, 164, 1);
      span {
        color: #6dc9fe;
      }
    }
  }
}
.whds-login-btn {
  cursor: pointer;
}
.login-way {
  padding-bottom: 20px;
  padding-top: 8px;
  text-align: center;
  img {
    cursor: pointer;
  }
}
.login-way-line {
  height: 1px;
  margin-top: 15px;
  position: relative;
  > div {
    color: rgba(164, 164, 164, 1);
    width: 100px;
    background: #13171d;
    margin: auto;
    text-align: center;
    position: relative;
    top: -7px;
  }
}
</style>

