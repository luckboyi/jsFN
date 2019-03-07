<template>
  <transition name="fade">
    <div class="maskCon pf pr" v-if="isShow" id="maskCon" ref="maskCon">
      <div class="inMaskCon pa center pr" v-if="params">
        <div class="closeIcon pa f18 cp" @click="closeFn">×</div>
        <div v-if="params.type == 1">
          <loadingCom v-show="!params.basicInfo"/>
          <div class="clearfix conCon borderBttom" v-show="params.basicInfo.logo">
            <div class="imgCon fl">
              <img :src="params.basicInfo.logo" alt>
            </div>
            <div class="msgCon fl clearfix pr">
              <div class="name clearfix">
                <div class="nameCon fl f16 whiteCol">{{params.basicInfo.nickName}}</div>
                <div v-if="params.type == 1">
                  <div class="fl mainCol cp" @click="editorFn" v-if="!isEditor">更改</div>
                  <div class="fl mainCol cp" v-show="errorMsg == ''" @click="saveFn" v-else>保存</div>
                  <div class="inputCon pa pr" v-show="isEditor">
                    <div class="pa text-red" style="top:22px;width:200%;">{{errorMsg}}</div>
                    <input
                      style="left:-2px;"
                      @focus="focusFn"
                      @blur="blurFn"
                      ref="userInput"
                      placeholder="请输入4-16位字符"
                      type="text"
                      v-model="userName"
                    >
                  </div>
                </div>
              </div>
              <div class="rankCon" style="margin-top:10px;">
                <p>
                  <span class="inRankCon pr">
                    段位：
                    <img
                      style="left:30px; top:-10px;"
                      class="rankImg pa"
                      :src="getParagraphStaticData(params.basicInfo.winRate).img"
                      alt
                    >
                    <b
                      style="left:80px; "
                      class="pa"
                      v-text="getParagraphStaticData(params.basicInfo.winRate).name"
                    ></b>
                  </span>
                  <span>
                    胜率：
                    <b class="mainCol f26">{{params.basicInfo.winRate}}%</b>
                  </span>
                </p>
                <p
                  v-if="params.basicInfo.team !=null && params.basicInfo.team.name !=''&& params.basicInfo.team !=''"
                >
                  所属战队：
                  <b class="blueCol f14">{{params.basicInfo.team.name}}</b>
                </p>
                <p v-else>
                  所属战队：
                  <b class="blueCol f14">暂无战队！</b>
                </p>
                <p v-if="params.type == 1">
                  手机号：
                  <b class="whiteCol f14">{{params.basicInfo.phone}}</b>
                </p>
              </div>
            </div>
          </div>
          <div class="userCon pr" v-if="params.type == 1">
            <ul class="tac">
              <li @click="navClick(0)" :class="{active:index == 0}" class="fl">收益</li>
              <li @click="navClick(1)" :class="{active:index == 1}" class="fl">游戏角色</li>
              <li @click="navClick(2)" :class="{active:index == 2}" class="fl">战绩查询</li>
            </ul>
            <div v-if="index == 0">
              <p class="detailCon">
                钻石数量：
                <b class="whiteCol">{{params.basicInfo.diamond}}</b>
                <i class="diamondIcon iconCon"></i>
                <a href="/record/payment">充值明细</a>
              </p>
              <p class="detailCon">
                金币数量：
                <b class="whiteCol">{{params.basicInfo.gold}}</b>
                <i class="goldIcon iconCon"></i>
                <a href="/record/payment">收支明细</a>
              </p>
            </div>
            <div v-if="index == 1">
              <div class="bindGameCon tac">
                <div class="title clearfix" style="background:rgba(0,0,0,.1);">
                  <div class="fl">区服</div>
                  <div class="fr">
                    <div>角色</div>
                  </div>
                </div>
                <div class="scrollStyle" style=" max-height:214px;overflow-y:auto;min-height:80px;">
                  <div
                    class="content clearfix"
                    v-for="(item,index) in userGameBindList"
                    :key="index"
                  >
                    <div class="fl clearfix inCon pr">
                      <div class="fl gameIcon pa topCenter">
                        <img class="pa center" :src="item.gameImg" alt>
                      </div>
                      <div class="gameName fl">{{item.gameName}}</div>
                    </div>
                    <div
                      class="fr clearfix inCon pr"
                      :ref="`editro${index}`"
                      v-if=" item.playerName != ''"
                    >
                      <div class="fl bindGameName" v-if="!newName[index]">{{item.playerName}}</div>
                      <div class="fl bindGameName" v-else>{{newName[index]}}</div>
                      <div class="fl blueCol cp" @click="playerNameEditorFn(item,index)">修改</div>
                      <div class="pa inputCon pr" v-show="activeIndex == index">
                        <input
                          type="text"
                          v-model="playerNameEditor"
                          @focus="focusFn2(playerNameEditor)"
                          @blur="blurFn2(playerNameEditor)"
                        >
                        <p
                          class="pa text-red tal"
                          style="left:-112px;top:24px;width:200%;"
                        >{{errorMsg2}}</p>
                      </div>
                    </div>
                    <div class="fr clearfix inCon pr" v-else>
                      <div class="fl bindGameName" v-if="!newName[index]">{{item.playerName}}</div>
                      <div class="fl bindGameName" v-else>{{newName[index]}}</div>
                      <div class="fl bindGameName">暂未绑定</div>
                      <div
                        class="fl mainCol cp"
                        v-show="errorMsg2==''"
                        @click="playerNameEditorFn(item,index)"
                      >绑定</div>
                      <div class="pa inputCon pr" v-show="activeIndex == index">
                        <input
                          type="text"
                          v-model="playerNameEditor"
                          @focus="focusFn2(playerNameEditor)"
                          @blur="blurFn2(playerNameEditor)"
                        >
                        <p class="pa text-red tal" style="top:24px;width:230%;">{{errorMsg2}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="index==2" style="text-align:center;">
              <a href="/myRecord">战绩查询</a>
            </div>
          </div>
        </div>
        <div v-else v-show="basicInfo">
          <loadingCom v-show="!basicInfo"/>
          <div class="clearfix conCon borderBttom">
            <div class="imgCon fl">
              <img :src="basicInfo.logoUrl" alt>
            </div>
            <div class="msgCon fl clearfix pr">
              <div class="name clearfix">
                <div class="nameCon fl f16 whiteCol">{{basicInfo.nickName}}</div>
              </div>
              <div class="rankCon">
                <p>
                  <span class="inRankCon pr">
                    段位：
                    <img
                      style="left:30px; top:-10px;"
                      class="rankImg pa"
                      :src="getParagraphStaticData(basicInfo.rateOfWinning).img"
                      alt
                    >
                    <b
                      style="left:80px; "
                      class="pa"
                      v-text="getParagraphStaticData(basicInfo.rateOfWinning).name"
                    ></b>
                  </span>
                  <span>
                    胜率：
                    <b class="mainCol f26">{{basicInfo.rateOfWinning}}%</b>
                  </span>
                </p>
                <p
                  v-if="basicInfo.teamName !=null && basicInfo.teamName !=''&& basicInfo.teamName !=''"
                >
                  所属战队：
                  <b class="blueCol f14">{{basicInfo.teamName}}</b>
                </p>
                <p v-else>
                  所属战队：
                  <b class="blueCol f14">暂无战队！</b>
                </p>
              </div>
            </div>
          </div>
          <div class="userCon pr hide">
            <ul class="tac">
              <li @click="navClick(1)" class="fl active">游戏角色</li>
            </ul>
            <div>
              <div class="bindGameCon tac">
                <div class="title clearfix" style="background:rgba(0,0,0,.1);">
                  <div class="fl">区服</div>
                  <div class="fr">
                    <div>角色</div>
                  </div>
                </div>
                <div class="scrollStyle" style=" max-height:214px;overflow-y:auto;">
                  <div
                    class="content clearfix"
                    v-for="(item,index) in userGameBindList"
                    :key="index"
                  >
                    <div class="fl clearfix inCon pr">
                      <div class="fl gameIcon pa topCenter">
                        <img class="pa center" :src="item.gameImg" alt>
                      </div>
                      <div class="gameName fl">{{item.gameName}}</div>
                    </div>
                    <div class="fr clearfix inCon" v-if=" item.playerName != ''">
                      <div class="fl bindGameName">{{item.playerName}}</div>
                    </div>
                    <div class="fr clearfix inCon" v-else>
                      <div class="fl bindGameName">暂未绑定</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { getParagraphStaticData } from "@/assets/config/paramMap";
import { get_other_userInfo, bindGame } from "@/request/user";
import { checkBadWords } from "@/request/other";
import loadingCom from "@/components/loading/index";
import Vue from "vue";
export default {
  data() {
    return {
      isShow: true,
      params: "",
      userName: "",
      isEditor: false,
      index: 0,
      basicInfo: "",
      errorMsg: "",
      userGameBindList: [],
      playerNameEditor: "",
      activeIndex: -1,
      playerNameEditor0: "ces",
      newName: [],
      errorMsg2: ""
    };
  },
  components: {
    loadingCom
  },
  watch: {
    params() {
      this.params.gameList.forEach(el => {
        (el.playerName = ""),
          (el.isEditor = false),
          (el.editorTxt = "修改"),
          (el.editorName = "");
      });
      this.userGameBindList = this.params.gameList;
      if (this.params.type != undefined && this.params.type != 1) {
        this.getOtherInfo();
      } else {
        this.userGameBindList.forEach((el, key) => {
          let index = this.params.basicInfo.playerList.findIndex(
            item => item.gameId == el.gameId
          );
          if (index != -1) {
            this.userGameBindList[
              key
            ].playerName = this.params.basicInfo.playerList[index].playerName;
          }
        });
      }
      return (this.params = this.params);
    },
    basicInfo() {
      this.userGameBindList.forEach((el, key) => {
        let index = this.basicInfo.userGameBindList.findIndex(
          item => item.gameId == el.gameId
        );
        if (index != -1) {
          this.userGameBindList[
            key
          ].playerName = this.basicInfo.userGameBindList[index].playerName;
        }
      });
    }
  },
  methods: {
    focusFn2(val) {
      this.errorMsg2 = "";
    },
    blurFn2(val) {
      this.checkBadWords2(val);
    },
    blurFn() {
      this.checkBadWords(this.userName);
    },
    async checkBadWords2(data) {
      let res = await checkBadWords(data);
      if (res.code == 200) {
        if (res.data) {
          this.errorMsg2 = "包含敏感词，请重新输入";
        }
      }
    },
    async checkBadWords(data) {
      let res = await checkBadWords(data);
      if (res.code == 200) {
        if (res.data) {
          this.errorMsg = "包含敏感词，请重新输入";
        }
      }
    },
    playerNameEditorFn(item, index) {
      this.activeIndex = index;
      if (this.playerNameEditor.length > 0) {
        this.bindGame(item, index);
      } else {
        this.errorMsg2 = "请输入正确的角色名";
      }
    },
    async bindGame(item, index) {
      let that = this;
      let res = await bindGame(item.gameId, this.playerNameEditor);
      if (res.code === 200) {
        this.activeIndex = -1;
        let json = {
          gameId: item.gameId,
          playerName: this.playerNameEditor
        };
        this.newName[index] = this.playerNameEditor;
        this.params.editorPlayerName(json);
      } else {
        maskCom({
          txt: [res.msg],
          firstBtnTxt: "确定"
        });
      }
    },
    //判读昵称是否合法
    IsOK(str) {
      if (str.length > 0) {
        // var ta=str.split(""),str_l=0;
        // var str_fa=Number(ta[0].charCodeAt());
        // if((str_fa>=65&&str_fa<=90)||(str_fa>=97&&str_fa<=122)||(str_fa>255))
        // {
        //     for(var i=0;i<=ta.length-1;i++)
        //     {
        //     str_l++;
        //     if(Number(ta[i].charCodeAt())>255){str_l++;}
        //     }
        //     if(str_l>=4&&str_l<=16){return true;}
        // }

        return false;
      }
    },
    //修改昵称
    editorFn() {
      this.isEditor = true;
      this.$refs.userInput.focus();
    },
    saveFn() {
      if (this.userName.length < 4) {
        this.errorMsg = "请输入4-16位字母、数字或中文组成的字符";
      } else if (this.userName.length > 18) {
        this.errorMsg = "请输入4-16位字母、数字或中文开头组成的字符";
      } else {
        this.isEditor = false;
        this.errorMsg = "";
        this.params.saveFn(this.userName);
      }
    },
    focusFn() {
      this.errorMsg = "";
    },
    navClick(i) {
      this.index = i;
    },
    async getOtherInfo() {
      let res = await get_other_userInfo(this.params.uuid);
      if (res.code == 200) {
        this.basicInfo = res.data;
      } else {
        this.isShow = false;
      }
    },
    getParagraphStaticData,
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-60px);
}
.bindGameName {
  width: 80%;
}
.bindGameCon {
  width: 290px;
  margin-left: 62px;
  line-height: 30px;
  .title {
    .fl {
      width: 40%;
    }
    .fr {
      width: 60%;
      div {
        width: 80%;
      }
    }
  }
  .inCon {
    &.fl {
      width: 40%;
    }
    &.fr {
      width: 60%;
    }
    .gameName {
      width: 100%;
    }
  }
  .content {
    margin-top: 20px;
    background: rgba(0, 0, 0, 0.3);
  }
  .gameIcon {
    left: 4px;
    top: 50%;
    width: 20px;
    height: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.whiteCol {
  color: #fff;
}
.conCon {
  padding: 30px 30px 50px;
  border-bottom: 1px solid #000;
  .imgCon {
    margin-right: 20px;
    img {
      width: 43px;
      height: 43px;
      border-radius: 100%;
      border: 1px solid rgba(54, 61, 75, 0.95);
    }
  }
  .name {
    line-height: 26px;
  }
  .rankCon {
    line-height: 30px;
    .inRankCon {
      width: 194px;
      display: inline-block;
    }
  }
  .nameCon {
    width: 200px;
    height: 28px;
    margin: 0 0 10px 0;
  }
  .inputCon {
    height: 28px;
    width: 150px;
    padding: 2px;
    border: 1px solid rgba(54, 61, 75, 0.95);
    background: #242a35;
    input {
      width: 100%;
      height: 100%;
      line-height: 20px;
      border: 0;
      text-indent: 4px;
      background: #242a35;
    }
  }
}
.userCon {
  min-height: 170px;
  padding: 20px 30px 30px;
  border-top: 1px solid rgba(54, 61, 75, 0.95);
  ul {
    position: absolute;
    top: -30px;
    left: 92px;
    li {
      width: 90px;
      line-height: 28px;
      border: 1px solid rgba(54, 61, 75, 1);
      background: rgba(54, 61, 75, 1);
      cursor: pointer;
      &.active {
        background: rgba(19, 23, 29, 0.95);
        border-bottom-color: rgba(19, 23, 29, 0.95);
      }
    }
  }
  .detailCon {
    text-indent: 62px;
    line-height: 30px;
    .iconCon {
      vertical-align: sub;
      margin-left: 10px;
    }
    a {
      text-decoration: underline;
    }
  }
}
.maskCon {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
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
.inputCon {
  width: 70%;
  padding: 2px;
  input {
    width: 90%;
    line-height: 22px;
    border: 1px solid #ccc;
    background: #000;
    text-indent: 6px;
    text-align: center;
  }
}
</style>
