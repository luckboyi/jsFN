<template>
  <div>
    <!-- 轮播图 -->
    <!-- <div class="banner" style="position:relative;top:-1px;">
      <swiper-banner ref="banner"></swiper-banner>
    </div>-->
    <div class="w12 clearfix" style="max-width:1200px;margin:0 auto;background:#1C2126;z-index:88;">
      <div class="match-header">
        <div class="header-title">
          <div class="fl title-info pr">
            <span>{{PassPortRoomData.roomName}}</span>
            <span>ID:{{PassPortRoomData.roomId}}</span>
            <i class="lock-open"></i>
            <span class="triggleIcon"></span>
          </div>
          <div class="fl title-operate">
            <a href="javascript:;" @click="goBack" class="fr">
              <i class="go-back"></i> 返回
            </a>
          </div>
        </div>
        <div class="macth-info">
          <ul>
            <li>
              <div class="info-top">
                <img :src="PassPortRoomData.gameImg" alt>
              </div>
              <div class="info-bot">
                <label>当前:</label>
                <span>{{PassPortRoomData.roomAddNum}}/{{PassPortRoomData.roomTotalNum}}</span>
              </div>
            </li>
            <li>
              <div class="info-top">
                <label>地图:</label>
                <span>{{PassPortRoomData.gameMap}}</span>
              </div>
              <div class="info-bot">
                <label>模式:</label>
                <span>{{PassPortRoomData.patternName}}</span>
              </div>
            </li>
            <li>
              <div class="info-top">
                <label>比赛类型:</label>
                <span>{{PassPortRoomData.gameName}}</span>
              </div>
              <div class="info-bot">
                <label>比赛时间:</label>
                <span v-if="PassPortRoomData.dataType == 1">人满即开</span>
                <span v-else>{{PassPortRoomData.roomBeginDate | formatDate}}</span>
              </div>
            </li>
            <li>
              <div class="info-top">
                <label>发起人:</label>
                <span
                  @click="lookUserInfo(PassPortRoomData.passportUuid)"
                >{{PassPortRoomData.nickName}}</span>
              </div>
            </li>
          </ul>
          <div class="fr info-tip">
            <div class="tip-top">
              <label>总奖金</label>
              <span>{{PassPortRoomData.totalMoney}}</span>
              <i class="goldIcon"></i>
            </div>
            <div class="tip-bot">
              <div class="fl bot-fl" style="padding:0 6px;">
                <label class="hide">第1名:</label>
                <span>
                  人头数*击杀数
                  <i class="goldIcon" style="vertical-align:sub;margin-left:4px;"></i>
                </span>
              </div>
              <span
                @click="showRule(PassPortRoomData.ruleReward,PassPortRoomData.enrollMoney)"
              >规则/奖励</span>
            </div>
          </div>
        </div>
      </div>
      <div class="match-content scrollStyle">
        <ul>
          <li
            @click="lookUserInfo(item.passportUuid)"
            v-for="(item,index) in AllRoomData"
            :key="index"
            :class="{'icon-crown':item.passportUuid==PassPortRoomData.passportUuid,'icon-slef':$store.state.user.basicInfo.uuid==item.passportUuid}"
          >
            <span>{{index+1}}</span>
            {{item.playerName}}
          </li>
        </ul>
      </div>
      <div class="match-footer">
        <div class="fl footer-text-info">
          <div v-for="(item,index) in macthUserInfo" :key="index">
            <div v-if="item.playerName">
              玩家
              <span>{{item.playerName}}</span>
              <span v-if="item.type==1">进入了房间</span>
              <span v-if="item.type==2">离开了房间</span>
            </div>
            <div v-if="item.userName">
              <span class="userTalk">{{item.userName}}:</span>
              <span>{{item.msg}}</span>
            </div>
          </div>
        </div>
        <div class="fl text-input">
          <input
            maxlength="50"
            @input="descArea"
            v-model.trim="introduct"
            name="abstract"
            id="abstract"
            placeholder="请输入..."
            v-on:keyup.enter="textSend"
          >
        </div>
        <div class="fr footer-btn">
          <div class="state-add" v-if="matchState==1" @click.prevent="changeMatchState">加入比赛</div>
          <div class="state-loading" v-if="matchState==2">
            <div
              v-if="PassPortRoomData.passportUuid==$store.state.user.basicInfo.uuid"
              class="fl state-add startManual"
              :class="{isclick:PassPortRoomData.passportUuid==$store.state.user.basicInfo.uuid&&isStartManual}"
              @click.prevent="startManual"
            >开始比赛</div>
            <div class="fl load-btn">等待比赛中
              <!-- <span v-if="matchTime>0">{{matchTime}}</span> -->
            </div>
            <div class="fl load-quit" @click.prevent="quitRoomSure">退出</div>
          </div>
          <div class="state-start" v-if="matchState==3">
            <div class="fl start-operate">
              <p>比赛进行中</p>
              <div class="start-btn" @click.prevent="viewRoom">查看房间信息</div>
            </div>
            <div class="fl start-quit" @click.prevent="quitRoomFn">退出</div>
          </div>
          <div class="state-loading" v-if="matchState==4">
            <div class="fl load-btn">比赛已开始
              <!-- <span v-if="matchTime>0">{{matchTime}}</span> -->
            </div>
            <div class="fl load-quit" @click.prevent="quitRoomFn">退出</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 规则静态窗 -->
    <game-rule ref="gameRule" :show="gameRule"></game-rule>
    <!-- <tipsCom :countDown="startCountDown" :gameRoomName="gameRoomName" :gameRoomPwd="gameRoomPwd" @update="updateRoomState"/> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getPassPortRoomVcDataSrouce,
  getAllRoomPassPortDataSrouce,
  quitRoom,
  insertRoomPassPort,
  outPossportRoom
} from "@/request/match";

import { SetNoticeBuildGame } from "@/request/game";

import GameRule from "~/components/modals/static/gameRule";
import SwiperBanner from "~/components/swipers/banner";
import gameRomeCom from "@/components/modals/gameRome";
import tipsCom from "@/components/gameResult/tips";
export default {
  components: {
    SwiperBanner,
    GameRule,
    tipsCom
  },
  props: ["roomId", "isShowmachRoom"],
  data() {
    return {
      userName: "",
      userId: "",
      PassPortRoomData: {}, //我的赛事列表
      AllRoomData: {}, //房间所有人员列表信息
      matchNumList: [],
      macthUserInfo: [],
      matchState: 1,
      matchTime: "0",
      setTime: null,
      gameRule: false,
      gameRoomName: "",
      gameRoomPwd: "",
      startCountDown: false,
      type: "",
      isJoin: false,
      passportUuid: false,
      introduct: "",
      talkMsg: false,
      debounce: true, //输入防抖
      isStartManual: false
    };
  },
  computed: {
    ...mapState({
      canCreateMatch: state => state.user.basicInfo.canCreateMatch
    })
  },
  filters: {
    formatDate(time) {
      var d = new Date(time);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    }
  },
  mounted() {
    //this.$refs.banner.init();
    //this.getPassPortData();
    // this.viewRoom();
    this.getAllRoom();
    this.passportUuid = false;
  },
  watch: {
    //房间销毁
    //
    "$store.state.fromClient.roomId"() {
      if (this.$store.state.fromClient.roomId > 0) {
        this.isJoin = true;
      } else {
        this.isJoin = false;
      }
    },
    "$store.state.fromClient.call_room_owner"() {
      this.matchState = 4;
      this.passportUuid = true;
    },
    "$store.state.fromClient.call_commonRoom_update"() {
      let roomId = this.$store.state.fromClient.call_commonRoom_update.roomId;
      let roomState = this.$store.state.fromClient.call_commonRoom_update
        .roomState;
      if (this.matchState == 1 || this.matchState == 2) {
        if (this.PassPortRoomData.roomId == roomId) {
          maskCom({
            txt: ["此房间已失效，请返回首页加入其他比赛"],
            firstBtnTxt: "确定",
            firstBtnFn: () => {
              this.$emit("closeFn", true);
            }
          });
        }
      }
    },
    "$store.state.fromClient.call_enter_room_update"() {
      // console.log(this.$store.state.fromClient.call_enter_room_update);
      if (this.isShowmachRoom == true) {
        let type = this.$store.state.fromClient.call_enter_room_update.type;
        let roomId = this.$store.state.fromClient.call_enter_room_update.roomId;
        if (this.PassPortRoomData.roomId == roomId) {
          if (this.macthUserInfo.length == 2) {
            this.macthUserInfo.shift();
          }
          this.macthUserInfo.push(
            this.$store.state.fromClient.call_enter_room_update
          );
        }
      }
    },
    "$store.state.fromClient.call_leave_room_udpdate"() {
      if (this.isShowmachRoom == true) {
        let type = this.$store.state.fromClient.call_leave_room_udpdate.type;
        let roomId = this.$store.state.fromClient.call_leave_room_udpdate
          .roomId;
        if (this.PassPortRoomData.roomId == roomId) {
          if (this.macthUserInfo.length == 2) {
            this.macthUserInfo.shift();
          }
          this.macthUserInfo.push(
            this.$store.state.fromClient.call_leave_room_udpdate
          );
        }
      }
    },
    "$store.state.fromClient.call_talk_other"() {
      let talkData = this.$store.state.fromClient.call_talk_other.msgData.data;
      // console.log(talkData);
      if (this.isShowmachRoom == true) {
        let roomId = talkData.roomId;
        if (this.PassPortRoomData.roomId == roomId) {
          if (this.macthUserInfo.length == 2) {
            this.macthUserInfo.shift();
          }
          this.macthUserInfo.push(talkData);
        }
      }
    },
    "$store.state.fromClient.call_join_game_update"() {
      if (this.isShowmachRoom == true) {
        let roomId = this.$store.state.fromClient.call_join_game_update.roomId;
        let passportUuid = this.$store.state.fromClient.call_join_game_update
          .passportUuid;
        let type = this.$store.state.fromClient.call_join_game_update.type;
        let index = this.AllRoomData.findIndex(
          item => item.passportUuid == passportUuid
        );
        if (this.PassPortRoomData.roomId == roomId) {
          if (type == 1) {
            if (index == -1) {
              //this.PassPortRoomData.roomAddNum+=1
              let key = this.AllRoomData.findIndex(
                item => item.passportUuid == ""
              );
              this.AllRoomData[
                key
              ].passportUuid = this.$store.state.fromClient.call_join_game_update.passportUuid;
              this.AllRoomData[
                key
              ].nickName = this.$store.state.fromClient.call_join_game_update.nickName;
              this.AllRoomData[
                key
              ].playerName = this.$store.state.fromClient.call_join_game_update.playerName;
            } else {
              this.AllRoomData[
                index
              ].passportUuid = this.$store.state.fromClient.call_join_game_update.passportUuid;
              this.AllRoomData[
                index
              ].nickName = this.$store.state.fromClient.call_join_game_update.nickName;
              this.AllRoomData[
                index
              ].playerName = this.$store.state.fromClient.call_join_game_update.playerName;
            }
          } else {
            if (index != -1) {
              this.AllRoomData[index].passportUuid = "";
              this.AllRoomData[index].playerName = "";
              if (
                this.$store.state.fromClient.call_join_game_update
                  .passportUuid == this.$store.state.user.basicInfo.uuid
              ) {
                this.matchState = 1;
              }
            }
          }
        }
      }
    },
    "$store.state.fromClient.call_quit_game_update"() {
      if (this.isShowmachRoom == true) {
        let roomId = this.$store.state.fromClient.call_join_game_update.roomId;
        let passportUuid = this.$store.state.fromClient.call_join_game_update
          .passportUuid;
        let index = this.AllRoomData.findIndex(
          item => item.passportUuid == passportUuid
        );
        if (this.PassPortRoomData.roomId == roomId) {
          if (this.$store.state.fromClient.call_join_game_update.type == 1) {
            if (index == -1) {
              // this.PassPortRoomData.roomAddNum+=1
              let key = this.AllRoomData.findIndex(
                item => item.passportUuid == ""
              );
              this.AllRoomData[
                key
              ].passportUuid = this.$store.state.fromClient.call_join_game_update.passportUuid;
              this.AllRoomData[
                key
              ].nickName = this.$store.state.fromClient.call_join_game_update.nickName;
              this.AllRoomData[
                key
              ].playerName = this.$store.state.fromClient.call_join_game_update.playerName;
            } else {
              this.AllRoomData[
                index
              ].passportUuid = this.$store.state.fromClient.call_join_game_update.passportUuid;
              this.AllRoomData[
                index
              ].nickName = this.$store.state.fromClient.call_join_game_update.nickName;
              this.AllRoomData[
                index
              ].playerName = this.$store.state.fromClient.call_join_game_update.playerName;
            }
          } else {
            if (index != -1) {
              if (this.PassPortRoomData.roomAddNum > 0) {
                // this.PassPortRoomData.roomAddNum-=1
              }
              this.AllRoomData[index].passportUuid = "";
              this.AllRoomData[index].nickName = "";
              this.AllRoomData[index].playerName = "";
              if (
                this.$store.state.fromClient.call_join_game_update
                  .passportUuid == this.$store.state.user.basicInfo.uuid
              ) {
                this.matchState = 1;
              }
            }
          }
        }
      }
    },
    "$store.state.fromClient.call_roomUser_update"() {
      if (this.isShowmachRoom == true) {
        let roomId = this.$store.state.fromClient.call_roomUser_update.roomId;
        let roomAddNum = this.$store.state.fromClient.call_roomUser_update
          .roomAddNum;
        if (roomAddNum > 0) {
          this.PassPortRoomData.roomAddNum = roomAddNum;
        }
      }
    },
    "$store.state.fromClient.call_game_begin_info"() {
      this.matchState = 3;
      this.gameRoomName = this.$store.state.fromClient.call_game_begin_info.gameRoomName;
      this.gameRoomPwd = this.$store.state.fromClient.call_game_begin_info.gameRoomPwd;
      this.isJoin = true;
    },
    "$store.state.fromClient.call_create_game_result"() {
      let roomId = this.$store.state.fromClient.call_create_game_result.roomId;
      let passportUuid = this.$store.state.fromClient.call_create_game_result
        .passportUuid;
      this.gameRoomPwd = this.$store.state.fromClient.call_create_game_result.gameRoomPwd;
      this.gameRoomName = this.$store.state.fromClient.call_create_game_result.gameRoomName;
      let code = this.$store.state.fromClient.call_create_game_result.code;
      let msg = this.$store.state.fromClient.call_create_game_result.msg;
      //this.matchState = 3
      //  if(code == 200){
      //     tips2Com({
      //       isShow:true
      //     })
      //     this.matchState = 3
      //   }else{
      //    // this.startCountDown =false
      //     maskCom({
      //       txt:[msg]
      //     })
      //   }
    },
    "$store.state.fromClient.call_room_create_bef"() {
      let roomId = this.$store.state.fromClient.call_room_create_bef.data
        .roomId;
      this.gameRoomPwd = this.$store.state.fromClient.call_room_create_bef.data.gameRoomPwd;
      this.gameRoomName = this.$store.state.fromClient.call_room_create_bef.data.gameRoomName;
      let type = this.$store.state.fromClient.call_room_create_bef.createType;
      this.type = type;
      this.matchState = 3;
      if (type == 0) {
        autoTipsCom({
          gameRoomPwd: this.gameRoomPwd,
          gameRoomName: this.gameRoomName,
          surFn: function() {}
        });
      } else {
        tips1Com({
          gameRoomPwd: this.gameRoomPwd,
          gameRoomName: this.gameRoomName,
          roomId: roomId
        });
      }
    },
    "$store.state.fromClient.call_room_player_count"() {
      this.getAllRoom();
      let roomId = this.$store.state.fromClient.call_room_player_count.roomId;
      let roomAddNum = this.$store.state.fromClient.call_room_player_count
        .roomAddNum;
      if (this.PassPortRoomData.roomId == roomId) {
        this.PassPortRoomData.roomAddNum = roomAddNum;
      }
    }
  },
  methods: {
    //查看用户信息
    lookUserInfo(id) {
      if (id) {
        userInfoCom({
          type: 2,
          uuid: id,
          gameList: this.$store.state.init.gameList
        });
      }
    },
    // 聊天室事件
    descArea() {
      let textVal = this.introduct.length;
    },
    // 消息发送
    textSend() {
      if (this.introduct == "" || !this.debounce) {
        return;
      }
      this.debounce = false;
      setTimeout(() => {
        this.debounce = true;
      }, 500);
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 13,
        data: {
          roomId: this.roomId,
          msg: this.introduct,
          date: new Date().valueOf().toString(),
          userName: this.$store.state.user.basicInfo.nickName
        }
      });
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 25,
        data: {
          roomId: this.roomId,
          msg: this.introduct,
          date: new Date().valueOf().toString(),
          userName: this.$store.state.user.basicInfo.nickName
        }
      });
      this.introduct = "";
    },
    //状态更新
    updateRoomState(val) {
      this.matchState = val;
    },
    // 规则奖励
    showRule(ruleData, Money) {
      this.$refs.gameRule.showGameRuleReward(ruleData + "|" + Money);
    },
    // 查看房间信息
    viewRoom() {
      let self = this;
      window.gameRomeCom({
        type: 2,
        roomName: self.gameRoomName,
        // 接口没有返回密码，后期添加
        roomPsw: self.gameRoomPwd,
        isShowTime: true,
        isShowClose: true
      });
    },
    // 退出房间
    quitRoomSure() {
      let self = this;
      window.gameRomeCom({
        type: 3,
        firstBtnTxt: "确定",
        firstBtnFn: function() {
          self.quitRoom();
        },
        secBtnTxt: "取消",
        secBtnFn: ""
      });
    },
    quitRoomFn() {
      this.$emit("closeFn", true);
    },
    async quitRoom() {
      let self = this;
      let res = await quitRoom({ roomId: self.roomId });
      if (res.code == 200) {
        //self.resetSetItem('watchStorage', 0);
        //self.$store.commit('user/setRoomId',0)
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: 0 }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
        self.$store.commit("user/setDiamond", res.data.surplusMoney);
        let index = self.AllRoomData.findIndex(
          item => item.passportUuid == self.$store.state.user.basicInfo.uuid
        );
        if (index != -1) {
          self.AllRoomData[index].passportUuid = "";
          self.AllRoomData[index].playerName = "";
        }
        self.matchState = 1;
      }
    },
    goBack() {
      this.outPossportRoom();
      this.$emit("closeFn", true);
    },
    async outPossportRoom() {
      let res = await outPossportRoom({
        roomId: this.roomId
      });
    },
    // 房间所有人员列表信息
    async getAllRoom() {
      let res = await getAllRoomPassPortDataSrouce({
        // roomId: ""
        // 前期调试先行注释
        roomId: this.roomId
      });
      if (res.roomInfo != null) {
        this.PassPortRoomData = res.roomInfo;
        if (res.passport.length >= res.leastStartNum) {
          this.isStartManual = true;
        } else {
          this.isStartManual = false;
        }
        for (let i = 0; i < this.PassPortRoomData.roomTotalNum; i++) {
          if (!res.passport[i]) {
            res.passport.push({
              passportUuid: "",
              nickName: "",
              playerName: ""
            });
          }
        }
      }
      if (res.passport.length > 0) {
        this.AllRoomData = res.passport;
        if (res.passport[0].passportUuid != "") {
          this.PassPortRoomData.roomAddNum = res.roomInfo.roomAddNum;
        } else {
          this.PassPortRoomData.roomAddNum = 0;
        }
        res.passport.forEach(element => {
          if (element.passportUuid == this.$store.state.user.basicInfo.uuid) {
            this.matchState = 2;
            this.passportUuid = true;
          } else {
            this.passportUuid = false;
          }
        });
      }
    },
    changeMatchState() {
      let self = this;
      window.gameRomeCom({
        type: 1,
        priceNum: self.PassPortRoomData.enrollMoney,
        firstBtnTxt: "确定",
        firstBtnFn: function() {
          self.insertRoomPassPort();
        },
        secBtnTxt: "取消",
        secBtnFn: ""
      });
    },
    async startManual() {
      if (
        this.PassPortRoomData.passportUuid ==
          this.$store.state.user.basicInfo.uuid &&
        this.isStartManual
      ) {
        let res = await SetNoticeBuildGame({ roomId: this.roomId });
        if (res.code == 200) {
          this.matchState = 4;
        }
      }
    },
    async insertRoomPassPort() {
      let res = await insertRoomPassPort({
        roomId: this.roomId
      });

      if (res.code == 40001) {
        maskCom({
          txt: [res.msg],
          firstBtnTxt: "确定",
          firstBtnFn: () => {
            this.$router.push({ path: "/recharge" });
          }
        });
      } else {
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: this.roomId }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
        // this.$store.commit('user/setRoomId',this.roomId)
        this.getAllRoom();
        this.$store.commit("user/setDiamond", res.surplusMoney);
        this.matchState = 2;
        this.passportUuid = true;
      }
    },
    countTime() {
      //获取当前时间
      let date = new Date();
      let now = date.getTime();
      //设置截止时间
      let endDate = new Date("2018-12-30 23:00:00");
      let end = endDate.getTime();
      //时间差
      let leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24),
          m = Math.floor((leftTime / 1000 / 60) % 60),
          s = Math.floor((leftTime / 1000) % 60);
        //递归每秒调用countTime方法，显示动态时间效果
        if (h < 10) {
          h = "0" + h;
        }
        if (m < 10) {
          m = "0" + m;
        }
        if (s < 10) {
          s = "0" + s;
        }
        this.matchTime = h + ":" + m + ":" + s;
        this.setTime = setTimeout(this.countTime, 1000);
      } else {
        this.matchState = 3;
        this.matchTime = "";
        clearTimeout(this.setTime);
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.setTime);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/animate/default.scss";

.fl {
  float: left;
}
.fr {
  float: right;
}
.match-header {
  min-width: 1179px;
  min-height: 110px;
  background: rgba(48, 59, 81, 1);
  .header-title {
    min-height: 27px;
    border-bottom: 1px solid #152031;
  }
  .title-info {
    height: 27px;
    background: #152031;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 26px;
    padding: 0 30px 0 20px;
    > span {
      margin-right: 26px;
    }
    > span:nth-of-type(2) {
      font-size: 14px;
    }
  }
  .triggleIcon {
    width: 0;
    height: 0;
    border-width: 27px;
    border-style: solid;
    border-color: transparent transparent rgba(48, 59, 81, 1) transparent;
    position: absolute;
    right: -54px;
    top: -28px;
  }
  .title-operate {
    font-size: 14px;
    line-height: 26px;
    position: absolute;
    padding-right: 20px;
    right: 0;
  }
}
.macth-info {
  > ul {
    max-width: calc(100% - 260px);
    min-height: 84px;
    float: left;
  }
  li {
    float: left;
    margin-left: 24px;
    .info-top {
      height: 20px;
      margin: 17px 30px 17px 0;
      img {
        width: 34px;
        height: 20px;
      }
    }
  }
  .info-tip {
    margin-right: 20px;
    .tip-top {
      color: #fff;
      font-size: 24px;
      margin-bottom: 10px;
      label {
        color: #aeaeae;
      }
    }
    .tip-bot {
      font-size: 14px;
      color: #aeaeae;
      > span {
        cursor: pointer;
      }
      .bot-fl {
        min-width: 136px;
        height: 25px;
        background: rgba(52, 178, 250, 1);
        color: #2e384d;
        line-height: 25px;
        margin-right: 16px;
        text-align: center;
      }
    }
  }
}
.match-content {
  height: 320px;
  margin-top: 1px;
  padding: 20px 23px 0;
  overflow: auto;
  li {
    width: 222px;
    height: 26px;
    border: 1px solid rgba(212, 234, 255, 0.22);
    background: rgb(28, 33, 38);
    color: #afafaf;
    margin: 0 5px 5px 0;
    float: left;
    span {
      width: 26px;
      height: 24px;
      background: rgba(49, 55, 69, 1);
      display: inline-block;
      line-height: 24px;
      text-align: center;
    }
  }
  .icon-slef {
    border-color: #34b2fa;
    color: #34b2fa;
    position: relative;
    span {
      background: #34b2fa;
      color: #fff;
    }
  }
  .icon-crown {
    border-color: #f1a116;
    color: #f1a116;
    position: relative;
    span {
      background: #f1a116;
      color: #181c24;
    }
  }
  .icon-crown::after {
    content: "";
    width: 16px;
    height: 16px;
    background: url("~assets/img/icon/crown.png");
    position: absolute;
    top: -8px;
    left: -8px;
  }
}
.match-footer {
  min-height: 84px;
  padding: 10px 23px 0;
  .footer-text-info {
    width: 678px;
    height: 70px;
    border: 1px solid rgba(37, 39, 41, 1);
    background: rgba(22, 25, 31, 0.22);
    color: #656666;
    font-size: 14px;
    padding: 14px 10px;
    overflow-y: auto;
    span:first-child {
      color: #fff;
    }
  }
  .text-input {
    width: 678px;
    height: 30px;
    background: rgba(22, 25, 31, 0.22);
    border: 1px solid rgba(37, 39, 41, 1);
    > input {
      width: 100%;
      height: 100%;
      background: rgba(22, 25, 31, 0.22);
      color: #fff;
      font-size: 14px;
      padding: 8px;
      resize: none;
    }
    .textBtn {
      width: 90px;
      height: 100%;
      background: #34b2fa;
      color: #fff;
      cursor: pointer;
      line-height: 60px;
      text-align: center;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .footer-btn {
    width: calc(100% - 894px);
    position: absolute;
    right: 0;
    .state-add {
      width: 196px;
      height: 60px;
      background: linear-gradient(0deg, #ef901f, #db6f11);
      box-shadow: 0px 1px 3px 0px rgba(255, 255, 255, 0.35);
      border-radius: 5px;
      cursor: pointer;
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 60px;
      margin-left: 26px;
      text-align: center;
    }

    .startManual {
      width: 120px;
      background: #bbb;
      margin-right: 20px;
      position: absolute;
      left: -160px;
    }
    .isclick {
      background: linear-gradient(0deg, #ef901f, #db6f11);
    }
    .state-loading {
      .load-btn {
        width: 193px;
        height: 60px;
        background: linear-gradient(0deg, #ef901f, #db6f11);
        box-shadow: 0px 1px 3px 0px rgba(255, 255, 255, 0.35);
        border-radius: 5px;
        font-size: 24px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        span {
          font-size: 16px;
        }
      }
      .load-quit {
        font-size: 16px;
        color: rgba(241, 161, 22, 1);
        cursor: pointer;
        line-height: 60px;
        margin-left: 16px;
      }
    }
    .state-start {
      margin-left: 33px;
      .start-operate {
        width: 121px;
        text-align: center;
        p {
          font-size: 14px;
          color: rgba(211, 211, 211, 1);
        }
        .start-btn {
          width: 121px;
          height: 30px;
          background: linear-gradient(0deg, #ef901f, #db6f11);
          box-shadow: 0px 1px 3px 0px rgba(255, 255, 255, 0.35);
          border-radius: 5px;
          cursor: pointer;
          line-height: 30px;
          margin-top: 5px;
        }
      }
      .start-quit {
        font-size: 14px;
        color: rgba(241, 161, 22, 1);
        cursor: pointer;
        line-height: 76px;
        margin-left: 26px;
      }
    }
  }
  .userTalk {
    color: #2b95ca !important;
  }
}
</style>

