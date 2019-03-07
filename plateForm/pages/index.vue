<template>
  <div style="margin-top:-10px;">
    <div class="banner" style="position:relative;top:-1px; overflow:hidden;height:144px;">
      <!-- 轮播图 -->
      <swiper-banner ref="banner"></swiper-banner>
    </div>
    <div class="w12 clearfix main-content" style="max-width:1200px;">
      <!-- 左侧游戏列表 -->
      <div class="clearfix pr" style="height:100%;">
        <div
          class="left pr"
          style="padding-top:66px;z-index:20;position:relative;height:100%; box-sizing:border-box;"
        >
          <game-list ref="gameList" style="height:100%;" @select="selectGame"></game-list>
          <div
            v-show="$store.state.user.basicInfo.canCreateOfficialMatch"
            @click="applyOfficialMach"
            class="pa cp blueBtn applyOfficialGame tac leftCenter"
          >申请官方赛事</div>
          <div v-if="!isShowmachRoom" class="pa cp onlineTalk leftCenter" @click="openQQ">
            <i class="onlineTalkIcon"></i>在线客服
          </div>
        </div>
        <div class="right" style="z-index:0;">
          <!-- 右侧赛事tab切换 -->
          <div class="match-header">
            <match-list
              @selectMatch="selectMatch"
              :match-id="matchId"
              :can-create-match="canCreateMatch"
              class="match-tab"
            ></match-list>
            <!-- 搜索网吧id -->
            <search-input class="search-match pr" @search="searchMarch" :placeholder="`请输入房间id`"></search-input>
            <div
              v-show="$store.state.user.basicInfo.canCreateMatch && $store.state.fromClient.roomId == 0"
              class="btn login orange-btn-radius creat-match-btn"
              @click.prevent="createMatch"
            >发起比赛</div>
            <div
              @click="joinGame($store.state.fromClient.roomId)"
              class="pa cp"
              v-show="$store.state.fromClient.roomId != 0 && $store.state.fromClient.roomId !=undefined"
              style="top:24px;right:0px;background:#303A51; line-height:22px; padding:0 0 0 10px;"
            >
              房间ID：{{$store.state.fromClient.roomId}}
              <b style="margin-left:10px;">等待中</b>
              <i style="padding:0 10px;margin-left:10px;" class="rangeBtn fr">进入</i>
            </div>
          </div>
          <div class="match-content">
            <!-- 右侧赛事列表 -->
            <div class="match-table-content">
              <!-- 个人赛事列表 -->
              <person-match
                ref="personMatch"
                class="animate-hide-bottom"
                :class="{'fadeIn-bottom z-top':matchId==0}"
                @showRule="showRule"
                @showModal="showModal"
                @joinGame="joinGame"
              ></person-match>
              <!-- 官方赛事列表 -->
              <office-match
                ref="officeMatch"
                class="animate-hide-bottom"
                :class="{'fadeIn-bottom z-top':matchId==1}"
                @showRule="showRule"
                @showModal="showModal"
                @joinGame="joinGame"
              ></office-match>
              <!-- 我的游戏列表(我创建的房间) -->
              <my-match
                ref="myMatch"
                v-if="canCreateMatch"
                class="animate-hide-bottom"
                :class="{'fadeIn-bottom z-top':matchId==2}"
                @showRule="showRule"
                @showModal="showModal"
              ></my-match>
              <!-- 搜索出来的游戏列表 -->
              <search-match
                ref="searchMarch"
                class="animate-hide-bottom"
                :class="{'fadeIn-bottom z-top':matchId==3}"
                @showRule="showRule"
                @showModal="showModal"
              ></search-match>
            </div>
          </div>
        </div>
        <matchRoom
          v-show="$store.state.user.loginState"
          style="top:20px;z-index:88;"
          class="pa"
          v-if="isShowmachRoom"
          :isShowmachRoom="isShowmachRoom"
          :roomId="roomId"
          @closeFn="closeFn"
        />
      </div>
    </div>
    <!-- 下载客户端模态窗 -->
    <down-client :show.sync="modal.downClient"></down-client>
    <!-- 规则静态窗 -->
    <game-rule ref="gameRule" :show.sync="modal.gameRule"></game-rule>

    <add-match-model :PatternInfo="getInfo" :show.sync="showModel" @joinGame="joinGame"></add-match-model>
    <offical-mach-model :PatternInfo="getInfo" :show.sync="showOfficialModle"></offical-mach-model>

    <!-- 引导图 -->
    <guide v-if="guideShow" @guideHide="guideHide"></guide>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import GameList from "~/components/list/gameList";
import PersonMatch from "~/components/table/index/personMatch";
import OfficeMatch from "~/components/table/index/officeMatch";
import SearchMatch from "~/components/table/index/searchMatch";
import MyMatch from "~/components/table/index/myMatch";
import SwiperBanner from "~/components/swipers/banner";
import DownClient from "~/components/modals/static/downClient";
import GameRule from "~/components/modals/static/gameRule";
import MatchList from "~/components/list/indexMarchList";
import SearchInput from "~/components/input/searchInput";
import matchRoom from "@/components/match/matchRoom";
import Guide from "~/components/guide";
// request
import { getGemePatternInfo } from "@/request/game";
import { addPossportRoom, validateRoomPwd } from "@/request/match";
import addMatchModel from "~/components/match/addMatchModel";
import officalMachModel from "~/components/match/officalMachModel";

export default {
  components: {
    GameList,
    PersonMatch,
    OfficeMatch,
    SwiperBanner,
    DownClient,
    GameRule,
    MyMatch,
    MatchList,
    SearchInput,
    SearchMatch,
    addMatchModel,
    officalMachModel,
    matchRoom,
    Guide
  },
  data() {
    return {
      matchId: 0, //0:个人赛事；1:官方赛事
      gameId: 0,
      modal: {
        downClient: false, //下载模态窗
        gameRule: false //游戏规则模态窗
      },
      showModel: false,
      showOfficialModle: false,
      getInfo: [],
      gameList: [],
      roomId: "100275",
      isShowmachRoom: false,
      guideShow: false
    };
  },
  watch: {
    "$store.state.user.basicInfo.roomId"() {
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 11,
        data: { roomId: this.$store.state.user.basicInfo.roomId }
      });
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 12,
        data: { msg: "获取roomId" }
      });
    },
    isShowmachRoom() {
      if (this.isShowmachRoom == false) {
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
      }
    },
    "$store.state.user.basicInfo.loginCount"() {
      if (this.$store.state.user.basicInfo.loginCount == 1) {
        this.guideShow = true;
      }
    }
    // '$store.state.fromClient.call_game_begin_info'(){
    //   if(!this.isShowmachRoom){
    //     gameRomeCom({
    //         type:2,
    //         roomName:this.$store.state.fromClient.call_game_begin_info.gameRoomName,
    //         roomPsw:this.$store.state.fromClient.call_game_begin_info.gameRoomPwd
    //     })
    //   }
    // }
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window !== "undefined") {
      // 滚动条移除
    }
    next(vm => {
      document.title = `${vm.$PROJECT_INFO.name}(首页)`;
      setTimeout(() => {
        // 渲染banner
        vm.$refs.banner.init();
        // 渲染赛事
        vm.$refs.gameList.init();
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    // 滚动条恢复
    next();
  },
  computed: {
    ...mapState({
      canCreateMatch: state => state.user.basicInfo.canCreateMatch
    })
  },
  mounted() {
    window.$nuxt.$store.dispatch('toClient/sendMsg',{type:12,data:{'msg':'获取roomId'}})
  },
  methods: {
    async createMatch() {
      this.showModel = true;
      this.getInfo = await getGemePatternInfo();
    },
    //打开外联qq
    openQQ() {
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 6,
        data: {
          msg: "打开外链qq",
          src: "http://wpa.qq.com/msgrd?v=3&uin=2233495590&site=qq&menu=yes"
        }
      });
    },
    //申请官方赛事
    applyOfficialMach() {
      this.showOfficialModle = true;
    },
    // 选择游戏
    selectGame(id) {
      this.gameId = id;
      this.selectMatch(this.matchId);
    },
    // 选择比赛
    selectMatch(id, searchText) {
      this.matchId = id;
      switch (id) {
        case 0: //个人比赛
          this.$refs.personMatch.refreshData(this.gameId, this.matchId);
          break;
        case 1: //官方比赛
          this.$refs.officeMatch.refreshData(this.gameId, this.matchId);
          break;
        case 2: //我的比赛
          this.$refs.myMatch.refreshData(this.gameId, this.matchId);
          break;
        case 3: //搜索比赛
          this.$refs.searchMarch.refreshData(
            this.gameId,
            this.matchId,
            searchText
          );
          break;
        default:
          this.$refs.personMatch.refreshData(this.gameId, this.matchId);
          break;
      }
    },
    showModal(val) {
      if (val == "downClient") {
        //this.isShowmachRoom = true
      } else {
        this.modal[val] = true;
      }
    },
    joinGame(id) {
      this.roomId = id;
      this.addPossportRoom(id);
    },
    guideHide() {
      this.guideShow = false;
    },
    closeFn() {
      this.isShowmachRoom = false;
      this.selectMatch(this.matchId);
    },
    async addPossportRoom(roomId) {
      let that = this;
      let res = await addPossportRoom({
        roomId: roomId
      });
      if (res.code == 200) {
        this.isShowmachRoom = true;
      } else {
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: 0 }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
        maskCom({
          title: "提示",
          txt: [res.msg],
          firstBtnTxt: "确定"
        });
      }
    },
    // 显示游戏规则与奖励
    showRule(ruleData) {
      this.$refs.gameRule.showGameRuleReward(ruleData);
    },
    // 查找房间id
    searchMarch(searchText) {
      this.selectMatch(3, searchText);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/animate/default.scss";
.applyOfficialGame {
  line-height: 40px;
  width: 120px;
  left: 50% !important;
  bottom: 80px !important;
  border-radius: 6px;
}
.bodyCon {
  padding-top: 70px !important;
}
.left {
  float: left;
  width: 220px;
}
.right {
  padding-top: 6px;
  float: left;
  margin-left: 30px;
  width: 950px;
  position: absolute;
  left: 215px;
  top: 0;
  bottom: 0;
  .match-header {
    overflow: hidden;
    .match-tab {
      float: left;
    }
    .search-match {
      float: left;
      position: relative;
      top: 16px;
      margin-left: 12px;
    }
    .creat-match-btn {
      width: 91px;
      height: 27px;
      line-height: 27px;
      float: right;
      position: relative;
      top: 18px;
    }
  }
}

.z-top {
  z-index: 10;
}
.main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 220px;
  bottom: 0;
  overflow: hidden;
}
// 右侧表格部分
.match-content {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 20px;
  overflow: hidden;
}
.match-table-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 20px;
  overflow: hidden;
}
.onlineTalk {
  bottom: 40px !important;
  left: 50% !important;
}
.onlineTalkIcon {
  width: 20px;
  height: 21px;
  background: url("../assets/img/icon/kef.png") no-repeat center;
  vertical-align: bottom;
  margin-right: 10px;
}
</style>
