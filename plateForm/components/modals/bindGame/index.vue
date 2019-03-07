<template>
  <transition name="fade">
    <div class="maskCon pf pr" v-if="isShow" id="bindGame" ref="maskCon">
      <div class="pa center pr bindGameCon tac">
        <h3 class="f20">请绑定游戏角色</h3>
        <div class="gameListCon">
          <ul>
            <li
              class="fl"
              @click="selectFn(item,index)"
              :class="{active: activeIndex == index}"
              v-for="(item,index) in params.gameLis"
              :key="index"
            >
              <div class="imgCon">
                <img :src="item.gameCover" alt>
              </div>
            </li>
          </ul>
        </div>
        <div class="inputCon pr">
          <input
            type="text"
            @focus="focusFn"
            @blur="blurFn"
            v-model="userGameName"
            placeholder="请输入您在游戏中的角色名"
          >
          <p class="pa text-red tal" style="top:28px;width:200%;">{{errorMsg}}</p>
        </div>
        <p>
          <a href="javascript:;" class="gotoLook" @click="gotoLook">哪里查看我的游戏角色？</a>
        </p>
        <p>
          <span class="surBtn rangeBtn f14 cp" @click="sureBind ">确认绑定</span>
        </p>
        <p class="tipsCol">*请准确绑定您的游戏角色，您才可以正常进行游戏，并获得相应奖励</p>
      </div>
    </div>
  </transition>
</template>
<script>
import { bindGame } from "@/request/user";
import { mapState, mapActions } from "vuex";
import { checkBadWords } from "@/request/other";
export default {
  data() {
    return {
      isShowTips: false,
      isShow: true,
      params: {
        gameLis: []
      },
      userName: "",
      isEditor: false,
      index: 2,
      activeIndex: 0,
      userGameName: "",
      gameName: "",
      errorMsg: ""
    };
  },
  watch: {
    params() {}
  },
  ...mapActions(["user/actionGetUserInfo"]),
  mounted() {},
  methods: {
    blurFn() {
      this.checkBadWords();
    },
    focusFn() {
      this.errorMsg = "";
    },
    async checkBadWords() {
      let res = await checkBadWords(this.userGameName);
      if (res.code == 200) {
        if (res.data) {
          this.errorMsg = "包含敏感词，请重新输入";
        }
      }
    },
    selectFn(item, index) {
      this.activeIndex = index;
    },
    async bindGame(fn) {
      let that = this;
      if (this.errorMsg == "") {
        let res = await bindGame(
          this.params.gameLis[this.activeIndex].gameId,
          this.userGameName.toString()
        );
        if (res.code === 200) {
          maskCom({
            txt: [res.msg],
            firstBtnTxt: "确定",
            firstBtnFn: () => {
              that.isShow = false;
            }
          });
        } else {
          maskCom({
            txt: [res.msg],
            firstBtnTxt: "确定"
          });
        }
      }
    },
    sureBind() {
      if (this.userGameName != "") {
        gameRomeCom({
          type: 0,
          userGameName: this.userGameName,
          gameName: this.params.gameLis[this.activeIndex].gameName,
          firstBtnTxt: "确定",
          firstBtnFn: () => {
            let json = {
              gameId: this.params.gameLis[this.activeIndex].gameId,
              playerName: this.userGameName
            };
            this.bindGame(this.params.firstBtnFn(json));
          },
          secBtnTxt: "取消",
          secBtnFn: ""
        });
      } else {
        maskCom({
          txt: ["请输入游戏中的角色名"],
          firstBtnTxt: "确定"
        });
      }
    },
    gotoLook() {
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 6,
        data: { msg: "跳转查看角色页面", src: "baidu.com" }
      });
    },
    firstBtnFn() {
      this.isShow = false;
      if (typeof this.params.firstBtnFn == "function") {
        this.params.firstBtnFn();
      }
    },
    secBtnFn() {
      this.isShow = false;
      if (typeof this.params.secBtnFn == "function") {
        this.params.secBtnFn();
      }
    },
    closeFn() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="scss">
.tipsCol {
  color: rgba(164, 164, 164, 1);
}
.bindGameCon {
  h3 {
    margin-bottom: 30px;
  }
  .gotoLook {
    text-decoration: underline;
  }
  .surBtn {
    display: inline-block;
    width: 190px;
    line-height: 40px;
    margin: 76px 0 18px;
  }
  .inputCon {
    margin: 20px 0;
    width: 260px;
    height: 30px;
    display: inline-block;
    border: 1px solid rgba(183, 183, 183, 1);
    input {
      width: 100%;
      height: 100%;
      background: rgba(20, 24, 30, 1);
      border: 0;
      outline: none;
      text-align: center;
    }
  }
  .gameListCon {
    width: 100%;
    max-height: 410px;
    overflow-y: auto;
    ul {
      display: inline-block;
      li {
        width: 180px;
        height: 260px;
        padding: 4px;
        margin: 0 10px;
        border: 2px solid rgba(0, 0, 0, 0);
        .imgCon,
        img {
          width: 100%;
          height: 100%;
        }
        &.active {
          border-color: #f1a116;
        }
      }
    }
  }
}
.maskCon {
  width: 100%;
  height: 100%;
  background: rgba(20, 24, 30, 1);
  top: 0;
  left: 0;
  z-index: 99999;
  .inMaskCon {
    width: 424px;
    background: rgba(19, 23, 29, 0.95);
    border: 1px solid rgba(54, 61, 75, 0.95);
    border-radius: 4px;
    color: #999999;
  }
}
.closeIcon {
  color: #a9a9a9;
  right: 10px;
  top: 6px;
  &:hover {
    color: #d3d3d3;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
