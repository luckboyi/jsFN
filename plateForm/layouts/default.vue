<template>
  <div id="container" style="height:100%;">
    <topNav/>
    <div class="bodyCon" :class="{homeCom:$route.name == 'index'}">
      <nuxt/>
    </div>
    <div
      class="hide"
      style="position:absolute;top:200px;width:100%;height:20px;z-index:99999;;background:red;"
    >{{$store.state.fromClient.msg}}</div>
    <div class="button pa hide" @click="sendFn">模拟测试</div>
    <modals></modals>
    <!-- <footCom/> -->
  </div>
</template>
<script>
import topNav from "@/components/common/topNav";
// 全局模态窗
import modals from "@/components/common/modals";
import footCom from "@/components/common/foot";
export default {
  components: {
    topNav,
    modals,
    footCom
  },
  mounted() {
    // window.$nuxt.$store.dispatch('toClient/sendMsg',{type:11,data:{'roomId':100006}})
    // window.$nuxt.$store.dispatch('toClient/sendMsg',{type:12,data:{'msg':'获取roomId'}})
    window.$nuxt.$store.dispatch("toClient/sendMsg", {
      type: 9,
      data: { msg: "获取网吧id" }
    });
  },
  watch: {
    "$store.state.fromClient.call_room_loading"() {
      gameRomeCom({
        type: 2,
        isShowTime: true,
        title: "游戏即将开始，请稍候",
        roomName: "正在生成中，请稍后...",
        roomPsw: "正在生成中，请稍后...",
        isShowClose: false
      });
    },
    "$store.state.fromClient.call_game_begin_info"() {
      if (
        this.$store.state.fromClient.call_game_begin_info.gameRoomName != "" &&
        this.$store.state.fromClient.call_game_begin_info.gameRoomName !=
          undefined
      ) {
        gameRomeCom({
          type: 2,
          roomName: this.$store.state.fromClient.call_game_begin_info
            .gameRoomName,
          roomPsw: this.$store.state.fromClient.call_game_begin_info
            .gameRoomPwd,
          isShowClose: false
        });
      } else {
        gameRomeCom({
          type: 2,
          isShowTime: true,
          title: "游戏即将开始，请稍候",
          roomName: "正在生成中，请稍后...",
          roomPsw: "正在生成中，请稍后...",
          isShowClose: false
        });
      }
    },
    "$store.state.fromClient.call_room_owner"() {
      let type = this.$store.state.fromClient.call_room_owner.type;
      tips2Com({
        txt: "比赛开始",
        isShow: true,
        type: type
      });
    },
    "$store.state.fromClient.call_official_match_room_update"() {
      let roomId = this.$store.state.fromClient.call_commonRoom_update.roomId;
      let roomState = this.$store.state.fromClient.call_commonRoom_update
        .roomState;
      let passportUuid = this.$store.state.fromClient.call_commonRoom_update
        .passportUuid;
      if (roomState != 1) {
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: 0 }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
      }
    },
    "$store.state.fromClient.call_commonRoom_update"() {
      let roomId = this.$store.state.fromClient.call_commonRoom_update.roomId;
      let roomState = this.$store.state.fromClient.call_commonRoom_update
        .roomState;
      let passportUuid = this.$store.state.fromClient.call_commonRoom_update
        .passportUuid;
      if (roomState != 1) {
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: 0 }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
      } else {
        if (passportUuid == this.$store.state.user.basicInfo.uuid) {
          window.$nuxt.$store.dispatch("toClient/sendMsg", {
            type: 11,
            data: { roomId: roomId }
          });
          window.$nuxt.$store.dispatch("toClient/sendMsg", {
            type: 12,
            data: { msg: "获取roomId" }
          });
        }
      }
    }
  },
  methods: {
    sendFn() {
      let that = this;
      let data = {
        success: true,
        msg: "success",
        code: 200,
        createType: 1,
        data: {
          gameRoomName: "宸呭嘲鐢电珵17dfgame_2018-12-2300007",
          gameRoomPwd: "917849",
          type: "1",
          contentType: "1",
          code: 200,
          passport: "",
          roomId: "110000260",
          passportUuid: "9b2a3859-d8f8-4bb1-b4cb-2db1787f959e"
        }
      };
      let data2 = {
        success: true,
        msg: "success",
        code: 200,
        data: {
          gameRoomName: "宸呭嘲鐢电珵17dfgame_2018-12-2300007",
          gameRoomPwd: "917849",
          type: "1",
          contentType: "1",
          passportUuid: "1111111",
          roomId: "10000038",
          playerName: "152"
        }
      };
      let date4 = {
        success: "false",
        data: {
          roomName: "宸呭嘲鐢电珵17dfgame_2018-12-2500065",
          passwd: "",
          passportUuid: "43b245b2-7203-4c0b-a370-a0993e0f032c",
          code: "200",
          msg: "游戏进程不存在"
        }
      };
      let data3 = {
        success: true,
        msg: "success",
        code: 200,
        data: { roomId: 10000038, roomAddNum: 5 }
      };
      window.PlatformNotify(23, 1);
    },
    sendFn3() {
      let that = this;
      let data = {
        success: true,
        msg: "success",
        code: 200,
        data: {
          roomState: 2,
          gameServer: "亚服",
          gameServerNo: "pc-as",
          roomAddNum: 0,
          matchType: 1,
          patternName: "10人赛",
          patternId: 72,
          ruleReward: "速度速度十分大方的丰富的",
          roomId: "1100348",
          gameName: "PUBG",
          firstMoney: "1",
          roomBeginDate: 1545457441712,
          gameMap: "孤岛",
          gamePattern: "普通模式",
          gameId: 1,
          nickName: "188****8921",
          dataType: 1,
          gameImg: "http://39.104.56.39/pubg.png ",
          rewardGold: 0,
          totalMoney: 0,
          updateTime: 1545457441712,
          passportUuid: "4a73447e-1ea4-4007-b9e0-7369d0a9810e",
          predictMoney: "0",
          roomName: "巅峰电竞17dfgame_2018-12-2200025",
          roomTotalNum: 10,
          createTime: 1545457441712,
          enrollMoney: 0,
          gameBeginDate: 1545457441712,
          isEncrypt: 1
        }
      };
      window.PlatformNotify(18, data);
    }
  }
};
</script>
<style lang="scss">
.button {
  left: 0;
  top: 80px;
  line-height: 30px;
  background: red;
  z-index: 99999999999999999;
}
#container {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 130px;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.bodyCon {
  height: 100%;
  // padding-bottom: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-top: 100px;
}
#__nuxt,
#__layout {
  height: 100%;
  overflow: hidden;
}
</style>
