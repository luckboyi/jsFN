<template>
  <div class="teamDetail w12 f12">
    <div class="inCon">
      <loadingCom v-show="isLoading"/>
      <div
        v-show="!isLoading"
        v-if="myTeamInfo != null && myTeamInfo.name !='' && myTeamInfo.name != undefined"
      >
        <div class="title clearfix">
          <div class="fl imgCon">
            <img :src="myTeamInfo.logoUrl" alt>
          </div>
          <div class="fl teamName">
            <h4 class="f26">{{myTeamInfo.name}}</h4>
            <div
              v-if="myTeamInfo.creatorName == $store.state.user.basicInfo.nickName"
              @click="disbandTeamFn()"
              class="cp btn tac rangeBtn f12"
            >解散战队</div>
            <div v-else class="btn tac rangeBtn f12 cp" @click="quickTeamFn">退出战队</div>
          </div>
          <div class="fl msgCon f14">
            <p>创建人:
              <b>{{myTeamInfo.creatorName}}</b>
            </p>
            <p class="teamRankCon">战队等级：
              <b class="pr">
                <i class="teamRank pa" :class="[`teamRank${myTeamInfo.level}`]"></i>
                {{myTeamInfo.level}}
              </b>
            </p>
            <p>当前人数:
              <b>{{totalNum}}/{{myTeamInfo.totalUserCount}}</b>
            </p>
          </div>
        </div>
        <div class="teamNumCon">
          <ol class="clearfix f16 tac">
            <li class="fl cp" :class="{active:navIndex == 0}" @click="navFn(0)">战队成员</li>
            <li
              class="fl cp"
              v-show="myTeamInfo.myRole == 1 ||myTeamInfo.myRole == 2 "
              :class="{active:navIndex == 1}"
              @click="navFn(1)"
            >申请名单</li>
          </ol>
          <div class>
            <loadingCom v-show="isSecLoading"/>
            <div v-show="!isSecLoading" v-if="navIndex == 0">
              <ul v-if="$store.state.user.basicInfo.team !=undefined">
                <li
                  v-if="myTeamMemer != null && myTeamMemer !='' && myTeamMemer!=undefined"
                  class="clearfix"
                  v-for="(item,index) in myTeamMemer"
                  :key="index"
                >
                  <a @click="userInfoMask(item.uuid)" class="fl name">{{item.nickName}}</a>
                  <div class="fl tag">{{item.roleDesc}}</div>
                  <div v-if="$store.state.user.basicInfo.team.myRole == 1">
                    <div v-if="item.role == 3" class="fr btnCon">
                      <span
                        v-if="index > 3 && myTeamMemer[3].role == 2"
                        class="canCelBtn tac cp blueBtn"
                        @click="promoteFn(item.teamUserRefId)"
                      ></span>
                      <span
                        v-else
                        class="canCelBtn tac cp blueBtn"
                        @click="promoteFn(item.teamUserRefId)"
                      >提升权限</span>
                      <b class="cp kickBtn fr" @click="removeMember(item.teamUserRefId)">踢出</b>
                    </div>
                    <div v-else-if="item.role == 2" class="fr btnCon">
                      <span
                        class="canCelBtn tac cp blueBtn"
                        @click="downgradeFn(item.teamUserRefId)"
                      >降低权限</span>
                      <b class="cp kickBtn fr" @click="removeMember(item.teamUserRefId)">踢出</b>
                    </div>
                    <div v-else class="fr btnCon"></div>
                  </div>
                  <div class="fr time">{{item.lastLoginTime | formatDate}}</div>
                </li>
                <li v-else class="tac">暂无成员，快去邀请好友加入您的战队吧！</li>
              </ul>
              <loadingCom v-show="loadingMore"></loadingCom>
              <p
                v-show="!loadingMore"
                v-if="current < teamMemberTotalpage"
                class="tac loaderMore"
                @click="loadMoreMember"
              >加载更多</p>
            </div>
            <div v-show="!isSecLoading" v-else>
              <ul>
                <li
                  v-if="applyTeamList.length > 0 && applyTeamList!='' && applyTeamList!=null"
                  class="clearfix"
                  v-for="(item,index) in applyTeamList"
                  :key="index"
                >
                  <div class="fl name">{{item.nickName}}</div>
                  <div class="fr btnCon">
                    <span
                      class="canCelBtn tac cp rangeBtn"
                      @click="applyHandle(item.teamJoinApplyId)"
                    >批准</span>
                    <b
                      class="cp canCelBtn tac kickBtn rangeBtn"
                      @click="rejectHandle(item.teamJoinApplyId)"
                    >拒绝</b>
                  </div>
                  <div class="fr time">{{item.createTime | formatDate}}</div>
                </li>
                <li v-if="applyTeamList.length == 0" class="tac">暂无申请记录！</li>
              </ul>
              <loadingCom v-show="loadingMoreApply"/>
              <p
                v-show="!loadingMoreApply"
                v-if="current < applyTeamListTotalpage"
                @click="loadMoreApply"
                class="tac loaderMore"
              >加载更多</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!isLoading" v-else class="noData tac">暂无战队，快去
        <nuxt-link to="/team/createTeam">创建</nuxt-link>或
        <nuxt-link to="/team/">加入战队</nuxt-link>吧!
      </div>
    </div>
  </div>
</template>
<script>
//import { mapState, mapActions } from 'vuex'
import {
  getMyteamInfo,
  getMyTeamMember,
  getMyteamApplyList,
  promoteFn,
  downgradeFn,
  selectTeamMembers,
  removeMember,
  applyHandle,
  rejectHandle,
  disbandTeam,
  quitTeam
} from "@/request/team";
import loadingCom from "@/components/loading/index";

export default {
  data() {
    return {
      navIndex: 0,
      myTeamInfo: {},
      applyTeamList: [],
      myTeamMemer: [],
      gameId: 1,
      current: 1,
      size: 10,
      isLoading: true,
      isSecLoading: true,
      teamMemberTotalpage: 1,
      applyTeamListTotalpage: 1,
      teamId: "",
      loadingMore: false,
      loadingMoreApply: false,
      totalNum: 0
    };
  },
  computed: {
    // ...mapState({
    //     myTeamInfo:state => state.team.myTeam,
    //     applyTeamList:state => state.team.applyTeamList
    // })
  },
  filters: {
    formatDate(time) {
      if (time != null) {
        var newDate = Date.parse(new Date());
        var valueTime = new Date(time);
        var diffTime = Math.abs(newDate - valueTime);
        if (diffTime > 7 * 24 * 3600 * 1000) {
          var date = new Date(valueTime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          var h = date.getHours();
          h = h < 10 ? "0" + h : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? "1" + minute : minute;
          second = second < 10 ? "0" + second : second;
          return m + "-" + d + " " + h + ":" + minute;
        } else if (
          diffTime < 7 * 24 * 3600 * 1000 &&
          diffTime > 24 * 3600 * 1000
        ) {
          // //注释("一周之内");
          // var time = newData - diffTime;
          var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
          return dayNum + "天前在线";
        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
          // //注释("一天之内");
          // var time = newData - diffTime;
          var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
          return dayNum + "小时内在线";
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
          // //注释("一小时之内");
          // var time = newData - diffTime;
          var dayNum = Math.floor(diffTime / (60 * 1000));
          if (dayNum <= 6) {
            return "刚刚在线";
          } else if (6 < dayNum <= 10) {
            return "10分钟内在线";
          } else if (10 < dayNum <= 31) {
            return "半小时内在线";
          } else if (31 < dayNum <= 60) {
            return dayNum + "一小时内在线";
          }
        }
      }
    }
  },
  components: {
    loadingCom
  },
  watch: {
    navIndex() {
      this.current = 1;
      if (this.navIndex == 0) {
        this.get_myTeam_member();
      } else {
        this.getApplyTeamList();
      }
    }
  },
  mounted() {
    this.getMyTeamInfo();
  },
  methods: {
    //查看个人信息
    userInfoMask(id) {
      if (id == this.$store.state.user.basicInfo.uuid) {
        userInfoCom({
          type: 1,
          basicInfo: this.$store.state.user.basicInfo,
          gameList: this.$store.state.init.gameList
        });
      } else {
        userInfoCom({
          type: 2,
          uuid: id,
          gameList: this.$store.state.init.gameList
        });
      }
    },
    loadMoreMember() {
      this.current += 1;
      this.loadingMore = true;
      this.get_myTeam_member();
    },
    loadMoreApply() {
      this.current += 1;
      this.loadingMoreApply = true;
      this.getApplyTeamList();
    },
    navFn(i) {
      this.navIndex = i;
      this.isSecLoading = true;
    },
    // ...mapActions([
    //     'team/actionMyteamInfo',
    //     'team/actionApplyTeamList'
    // ]),
    // async getMyTeamInfo() {
    //     await this['team/actionMyteamInfo']()
    //     this.$forceUpdate()
    // },
    async getApplyTeamList() {
      let res = await getMyteamApplyList(this.current, this.size);
      if (res.code == 200) {
        this.isSecLoading = false;
        this.loadingMoreApply = false;
        this.applyTeamList = res.data.records;
        this.applyTeamListTotalpage = Math.ceil(res.data.total / this.size);
        if (this.current != 1) {
          res.data.records.forEach(element => {
            this.applyTeamList.push(element);
          });
        } else {
          this.applyTeamList = res.data.records;
        }
      }
    },
    async get_myTeam_member() {
      let res = await selectTeamMembers(this.gameId, this.current, this.size);
      if (res.code == 200) {
        this.isLoading = false;
        this.isSecLoading = false;
        this.loadingMore = false;
        this.totalNum = res.data.total;
        if (this.current != 1) {
          res.data.records.forEach(element => {
            this.myTeamMemer.push(element);
          });
        } else {
          this.myTeamMemer = res.data.records;
        }
      }
    },
    async getMyTeamInfo() {
      let res = await getMyteamInfo();
      if (res.code == 200) {
        this.isLoading = false;
        this.isSecLoading = false;
        this.myTeamInfo = res.data;
        if (res.data != null) {
          if (res.data.teamMembers.total != undefined) {
            this.totalNum = res.data.teamMembers.total;
          }
          this.gameId = res.data.teamId;
          this.myTeamMemer = res.data.teamMembers.records;
          this.teamMemberTotalpage = Math.ceil(
            res.data.teamMembers.total / this.size
          );
        }
      }
    },
    async promoteFn(val) {
      let res = await promoteFn({ teamMemberId: val });
      if (res.code == 200) {
        this.getMyTeamInfo();
      }
    },
    async downgradeFn(val) {
      let res = await downgradeFn({ teamMemberId: val });
      if (res.code == 200) {
        this.getMyTeamInfo();
      }
    },
    async removeMember(val) {
      let res = await removeMember({ teamMemberId: val });
      if (res.code == 200) {
        this.getMyTeamInfo();
      }
    },
    async applyHandle(id) {
      let res = await applyHandle({
        applyId: id
      });
      if (res.code == 200) {
        this.totalNum += 1;
        this.getApplyTeamList();
      } else if (res.code == 10003) {
        maskCom({
          txt: ["用户已经加入了一支战队，此条申请已失效！"],
          firstBtnTxt: "确定",
          firstBtnFn: () => {
            this.getApplyTeamList();
          }
        });
      }
    },
    async rejectHandle(id) {
      let res = await rejectHandle({
        applyId: id
      });
      if (res.code == 200) {
        this.getApplyTeamList();
      }
    },
    disbandTeamFn() {
      maskCom({
        txt: ["是否确定要解散战队?"],
        firstBtnTxt: "是",
        secBtnTxt: "否",
        firstBtnFn: () => {
          this.surDisBind();
        }
      });
    },
    quickTeamFn() {
      maskCom({
        txt: ["是否退出此战队?"],
        firstBtnTxt: "是",
        secBtnTxt: "否",
        firstBtnFn: () => {
          this.sureQuickTeam();
        }
      });
    },
    async surDisBind() {
      let res = await disbandTeam({
        teamId: this.myTeamInfo.teamId
      });
      if (res.code == 200) {
        this.getMyTeamInfo();
        this.$store.dispatch("user/actionGetUserInfo");
      }
    },
    async sureQuickTeam() {
      let res = await quitTeam({
        teamId: this.myTeamInfo.teamId
      });
      if (res.code == 200) {
        this.getMyTeamInfo();
        this.$store.dispatch("user/actionGetUserInfo");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.teamDetail {
  .inCon {
    background: #222630;
    width: 100%;
  }
  .title {
    padding: 30px 0 20px 30px;
    border-bottom: 1px solid #13151d;
    .imgCon {
      width: 112px;
      height: 112px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .teamName {
      width: 344px;
      margin-left: 20px;
      h4 {
        color: #f1a116;
      }
      .btn {
        width: 122px;
        line-height: 32px;
        border-radius: 5px;
        margin-top: 46px;
      }
    }
    .msgCon {
      color: #919398;
      p {
        margin-bottom: 28px;
        &:last-child {
          margin: 0;
        }
        b {
          color: #fff;
          margin-left: 10px;
        }
      }
    }
  }
  .btnCon {
    width: 200px;
    height: 52px;
  }
  .teamNumCon {
    padding: 20px 30px;
    ol {
      li {
        width: 106px;
        height: 36px;
        background: rgba(47, 49, 54, 1);
        color: rgba(255, 255, 255, 0.8);
        line-height: 36px;
        &:hover {
          background: rgba(69, 72, 79, 1);
          color: rgba(211, 211, 211, 1);
        }
        &.active {
          background: rgba(241, 161, 22, 1);
          color: #222630;
        }
      }
    }
    ul {
      li {
        width: 100%;
        line-height: 52px;
        &:nth-child(2n + 1) {
          background: #1c1f25;
        }

        .name {
          margin-left: 24px;
          width: 300px;
          color: rgba(241, 161, 22, 1);
        }
        .time {
          width: 200px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
.canCelBtn {
  padding: 0 16px;
  line-height: 32px;
  display: inline-block;
  border-radius: 4px;
  color: #fff !important;
}
.kickBtn {
  color: rgba(241, 161, 22, 1);
  margin: 0 50px 0 26px;
}
.noData {
  padding: 20px 0;
  color: #919398;
  a {
    color: #34b2fa;
    text-decoration: underline;
  }
}
.teamRankCon {
  b {
    padding-left: 20px;
  }
  .teamRank {
    top: -40px;
    left: -60px;
    &.teamRank2 {
      top: -42px;
    }
  }
}
</style>