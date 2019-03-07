<template>
  <div class="personInfoCon">
    <loadingCom v-show="isShowLoading"/>
    <div
      v-show="!isShowLoading"
      class="inPersonalCenter f12"
      v-if="$route.path == '/personalCenter'||$route.path == '/personalCenter/'"
    >
      <div v-show="basicInfo.nickName !=''">
        <div class="title">
          <h4>个人信息</h4>
          <div class="clearfix">
            <div class="imgCon fl">
              <img :src="basicInfo.logoUrl" alt>
            </div>
            <div class="fl infoCon">
              <p class="f16 nickName">
                <b class="name pr">
                  <span v-text="basicInfo.nickName"></span>
                  <input
                    class="pa f12"
                    @focus="focusFn"
                    @blur="blurFn"
                    v-show="isShow"
                    type="text"
                    v-model="inputValue"
                  >
                  <b
                    class="text-red pa f12 errormsg"
                    v-show="errorMsg"
                  >请以中文或者英文字母开头，输入4-16位字母、数字、中文组成的字符</b>
                </b>
                <b v-show="!isShow" class="editorBtn f12 cp" @click="editorBtn">修改</b>
                <b v-show="isShow" class="editorBtn f12 cp" @click="saveBtn">保存</b>
              </p>
              <p class="rankContainer">
                <b class="rankCon">
                  段位：
                  <img
                    class="rankImg"
                    :src="getParagraphStaticData(basicInfo.rateOfWinning).img"
                    alt
                  >
                  <span v-text="getParagraphStaticData(basicInfo.rateOfWinning).name"></span>
                </b> 胜率：
                <b class="winProbability f26" v-text="basicInfo.rateOfWinning+'%'"></b>
              </p>
              <p class="teamMsg">
                所属战队：
                <b
                  class="f16"
                  v-if="basicInfo.teamInfo !=null && basicInfo.teamInfo.name !=''&& basicInfo.teamInfo !=''"
                >{{basicInfo.teamInfo.name}}</b>
                <b v-else style="color:#a9a9a9;">暂无战队！</b>
              </p>
            </div>
          </div>
        </div>
        <div class="msgCon pr">
          <div class="leftCenter pa tipsOnlyself f12 tac">以下信息仅对自己可见</div>
          <p>
            钻石数量：
            <b>
              <span v-text="basicInfo.diamondCount"></span>
              <i></i>
            </b>
            <nuxt-link tag="b" :to="$PAGE_API.record_recharge" class="rechargeHistory cp">充值记录</nuxt-link>
          </p>
          <p class="clearfix">
            <span class="fl clearix">
              <b class="fl jinbiTitle">金币数量：</b>
              <b class="fl">
                <span v-text="basicInfo.goldCount"></span>
                <i></i>
              </b>
            </span>
            <nuxt-link :to="$PAGE_API.record_payment" class="cp fl tac incomeHistory">收支明细</nuxt-link>
            <a
              class="btn fr rangeBtn tac cp"
              href="/api/common/withoutCodeRedirect?redirect=http://shop.zhuanbar.com/tokenLogin"
            >兑换</a>
          </p>
          <p>
            手机号码：
            <b v-text="basicInfo.phone"></b>
          </p>
        </div>
      </div>
      <div class="tac" style="line-height:40px;" v-show="!basicInfo.nickName">您暂未登录！</div>
    </div>
    <div v-show="!isShowLoading" class="inPersonalCenter f12" v-else>
      <div class="title" v-if="basicInfo !=null && basicInfo !=''">
        <h4>个人信息</h4>
        <div class="clearfix">
          <div class="imgCon fl">
            <img :src="basicInfo.logoUrl" alt>
          </div>
          <div class="fl infoCon" v-show="basicInfo.nickName !=''">
            <p class="f16 nickName">
              <b class="name pr" v-text="basicInfo.nickName"></b>
            </p>
            <p class="rankContainer">
              <b class="rankCon">
                段位：
                <img
                  class="rankImg"
                  :src="getParagraphStaticData(basicInfo.rateOfWinning).img"
                  alt
                >
                <span v-text="getParagraphStaticData(basicInfo.rateOfWinning).name"></span>
              </b> 胜率：
              <b
                class="winProbability f26"
                v-show="basicInfo.rateOfWinning !=undefined"
                v-text="basicInfo.rateOfWinning+'%'"
              ></b>
            </p>
            <p class="teamMsg">
              所属战队：
              <b v-if=" basicInfo.teamName !=null " v-text="basicInfo.teamName"></b>
              <b v-else style="color:#a9a9a9;">暂无战队！</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 获取段位信息
import { getParagraphStaticData } from "@/assets/config/paramMap";

import { updatedNickname } from "@/request/user";
import { mapActions } from "vuex";
import loadingCom from "@/components/loading/index";

export default {
  props: ["basicInfo"],
  components: {
    loadingCom
  },
  data() {
    return {
      isShow: false,
      inputValue: "",
      errorMsg: false,
      isShowLoading: true
    };
  },
  beforeCreate() {
    this.isShowLoading = true;
  },
  created() {
    this.isShowLoading = false;
  },
  methods: {
    getParagraphStaticData,
    blurFn() {
      if (!this.IsOK(this.inputValue)) {
        this.errorMsg = true;
      }
    },
    focusFn() {
      this.errorMsg = false;
    },
    ...mapActions(["login/actionLoginSuccess"]),
    async editorBtn() {
      this.isShow = true;
    },
    async saveBtn() {
      if (!this.IsOK(this.inputValue)) {
        this.errorMsg = true;
      } else {
        let res = await updatedNickname({
          nickName: this.inputValue
        });
        if (res.code == 200) {
          this.isShow = false;
          this.$store.commit("user/setName", this.inputValue);
        }
      }
    },
    IsOK(str) {
      if (str.length > 0) {
        var ta = str.split(""),
          str_l = 0;
        var str_fa = Number(ta[0].charCodeAt());
        if (
          (str_fa >= 65 && str_fa <= 90) ||
          (str_fa >= 97 && str_fa <= 122) ||
          str_fa > 255
        ) {
          for (var i = 0; i <= ta.length - 1; i++) {
            str_l++;
            if (Number(ta[i].charCodeAt()) > 255) {
              str_l++;
            }
          }
          if (str_l >= 4 && str_l <= 16) {
            return true;
          }
        }
        return false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
$mainCol: #f1a116;
.personInfoCon {
  padding: 46px 0 0 0;
  .inPersonalCenter {
    background: rgba(36, 42, 53, 1);
    padding: 40px 30px 0;
    color: rgba(177, 190, 208, 1);
  }
  .title {
    padding: 0 50px;
  }
  h4 {
    margin-bottom: 50px;
  }
  .imgCon {
    width: 72px;
    height: 72px;
    border-radius: 50px;
    background: #000;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50px;
    }
  }
  .winProbability {
    color: $mainCol;
  }
  .rankCon {
    width: 240px;
    display: inline-block;
  }
  .rankContainer {
    margin-bottom: 30px;
  }
  .nickName {
    color: #fff;
    margin: 26px 0 50px;
    .name {
      display: inline-block;
    }
    input {
      width: 100%;
      left: -1px;
      top: -1px;
      line-height: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #242a35;
      text-indent: 10px;
    }
  }
  .teamMsg {
    margin-bottom: 50px;
    b {
      color: #f1a116;
    }
  }
  .editorBtn {
    color: rgba(107, 118, 135, 1);
    text-decoration: underline;
    &:hover,
    &:active {
      color: #8f9baf;
    }
  }
  .msgCon {
    padding: 0 0 60px 152px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    p {
      margin-top: 50px;
      height: 34px;
      b {
        color: #fff;
      }
    }
    .btn {
      display: inline-block;
      width: 86px;
      line-height: 34px;
      border-radius: 4px;
    }
  }
  .jinbiTitle {
    color: #b1bed0 !important;
  }
  .rechargeHistory,
  .incomeHistory {
    margin-left: 10px;
    text-decoration: underline;
    color: #6b7687 !important;
    &:hover,
    &:active {
      color: #8f9baf !important;
    }
  }
}
.errormsg {
  width: 390px;
  top: 30px;
  left: 0;
}

.rankImg {
  width: 48px;
  height: 48px;
  position: relative;
  top: 16px;
}
.tipsOnlyself {
  width: 150px;
  height: 22px;
  line-height: 22px;
  background: rgba(255, 255, 255, 0.1);
  color: #646c7a;
  position: relative;
}
.tipsOnlyself::before {
  content: "";
  width: 0px;
  height: 0px;
  border-color: rgba(255, 255, 255, 0.1) transparent;
  border-width: 0 0 22px 22px;
  border-style: solid;
  transform: rotate(270deg);
  position: absolute;
  left: -22px;
}
.tipsOnlyself::after {
  content: "";
  width: 0px;
  height: 0px;
  border-color: rgba(255, 255, 255, 0.1) transparent;
  border-width: 0 0 22px 22px;
  border-style: solid;
  transform: rotate(-180deg);
  position: absolute;
  right: -22px;
}
</style>

