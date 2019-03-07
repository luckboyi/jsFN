<template>
  <div class="header pin pf" ref="header">
    <div class>
      <div class="clearfix" @mousedown="start($event)" @touchmove="move" @mouseup="end($event)">
        <!-- <div class=" clearfix" > -->
        <!-- logo图 -->
        <span @mouseover="childHover" @mouseout="childOut">
          <nuxt-link to="/" class="logo">
            <img
              src="~assets/img/icon/logo-icon.png"
              style="height:50px;margin-top:8px;width:110px;"
              alt="logo"
            >
          </nuxt-link>
        </span>

        <div class="fl f18 slogenCon" style="line-height:70px; margin-left:16px;">| 电竞赛事服务平台</div>
        <!-- header内页 -->
        <ul class="list clearfix" style="margin-left:28px;">
          <li class="cp" @mouseover="childHover" @mouseout="childOut">
            <nuxt-link to="/" class="f14" exact>首页</nuxt-link>
          </li>
          <li
            v-for="(item,index) in list"
            :key="index"
            class="cp"
            @mouseover="childHover"
            @mouseout="childOut"
          >
            <nuxt-link class="f14" v-if="!item.type" :to="item.link" v-text="item.name"></nuxt-link>
            <a class="f14" v-if="item.type==1" :href="item.link" v-text="item.name"></a>
          </li>
        </ul>
        <!-- 按钮组 -->
        <div class="right clearfix">
          <div
            class="btn login fl orange-btn-radius"
            v-if="!loginState"
            @click.prevent="toLogin"
            @mouseover="childHover"
            @mouseout="childOut"
          >登录</div>
          <div class="user-info fl clearfix" v-if="loginState">
            <ul class="clearfix">
              <li
                class="pr cp fl"
                style="margin:0;"
                @click.stop="showNoticeFn"
                @mouseover="childHover"
                @mouseout="childOut"
              >
                <i class="noticeIcon pa"></i>
                <span class="badge pa noticeBadge">
                  <i></i>
                </span>
                <div class="pa pr newListCon" v-show="showNotice">
                  <div class="pa upTrigleBig"></div>
                  <div class="pa upTrigleSmall"></div>
                  <div class="pa msgCon">
                    <h4 class="f14">最新公告</h4>
                    <div class="msgListCon scrollStyle noticeListCon">
                      <ul class="pr clearfix">
                        <loadingCom v-show="isLoading"/>
                        <li
                          v-show="!isLoading"
                          :class="{isRead:item.isRead}"
                          v-if="newsList.length !=0"
                          @click="lookNewSDetailFn(item)"
                          class="clearfix f12"
                          v-for="(item,index) in newsList"
                          :key="index"
                        >
                          <div class="fl ells1">
                            <i></i>
                            <span>{{item.title}}</span>
                          </div>
                          <div class="fr time">
                            <b>{{item.createTime |formatDate}}</b>
                            <i class="f24">›</i>
                          </div>
                        </li>
                        <li v-show="!isLoading" v-if="newsList.length == 0" class="tac">暂无消息未读!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li
                class="pr fl cp"
                @click.stop="showUserMsgFn"
                @mouseover="childHover"
                @mouseout="childOut"
              >
                <i class="newIcon pa"></i>
                <span class="badge pa newsBadge" v-if="totalMsg>0">
                  <i v-if="totalMsg<100">{{totalMsg}}</i>
                  <i v-else>99+</i>
                </span>
                <div class="pa pr newListCon" v-show="showUserMsg">
                  <div class="pa upTrigleBig"></div>
                  <div class="pa upTrigleSmall"></div>
                  <div class="pa msgCon">
                    <h4 class="f14">消息提示</h4>
                    <div class="msgListCon scrollStyle">
                      <ul class="pr clearfix">
                        <loadingCom v-show="isLoading"/>
                        <li
                          v-show="!isLoading"
                          :class="{isRead:item.isRead}"
                          v-if="userNewsList.length !=0"
                          @click.stop="lookDetailFn(item)"
                          class="clearfix f12"
                          v-for="(item,index) in userNewsList"
                          :key="index"
                        >
                          <div class="fl ells1">
                            <i></i>
                            <span>{{item.title}}</span>
                          </div>
                          <div class="fr time">
                            <b>{{item.createTime |formatDate}}</b>
                            <i class="f24">›</i>
                          </div>
                        </li>
                        <li v-show="!isLoading" v-if="userNewsList.length == 0" class="tac">暂无消息未读!</li>
                      </ul>
                      <div
                        v-if="current < totalUserMsgPage"
                        class="loadeMore tac f16"
                        @click.stop="loadeMoreFn"
                      >查看更多</div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="user-box clearfix fr">
                <a
                  href="javascript:;"
                  @click="userInfoMask(1)"
                  tag="div"
                  class="left cp"
                  @mouseover="childHover"
                  @mouseout="childOut"
                >
                  <img class="userImg" :src="basicInfo.logo" alt="用户头像">
                </a>
                <div class="right">
                  <p class="clearfix">
                    <span class v-text="basicInfo.nickName"></span>
                    <a
                      class="logout"
                      href="#"
                      style="float: right;"
                      @click.prevent="loginOut"
                      @mouseover="childHover"
                      @mouseout="childOut"
                    >退出</a>
                  </p>
                  <div class="clearfix">
                    <div class="left clearfix">
                      <i class="diamondIcon fl"></i>
                      <span v-text="basicInfo.diamond"></span>
                    </div>
                    <div class="right">
                      <i class="goldIcon fl"></i>
                      <span v-text="basicInfo.gold"></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="windowBtn fr clearfix pa">
      <div class="closeBtnIcon fr cp" v-on:click.stop="closeWindowFn"></div>
      <div class="miniBtnIcon fl pr cp" v-on:click.stop="miniWindowFn">
        <i class="pa"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { WEB_API, PAGE_API } from "@/assets/config/api";
import { updatedNickname } from "@/request/user";
import {
  getUserNoticeList,
  updateNotifyToRead,
  getNewsList
} from "@/request/userNotice";
import { loginOut } from "@/request/login";
import loadingCom from "@/components/loading/index";
export default {
  data() {
    return {
      // header内页数据
      list: [
        {
          name: "新闻",
          link: PAGE_API.news
        },
        {
          name: "商城",
          link: PAGE_API.shop
        },
        {
          name: "充值",
          link: PAGE_API.recharge
        },
        {
          name: "战队",
          link: PAGE_API.warTeam
        },
        {
          name: "FAQ",
          link: PAGE_API.faq
        }
      ],
      current: 1,
      size: 10,
      showUserMsg: false,
      userNewsList: [],
      totalMsg: 0,
      totalUserMsgPage: 1,
      isLoading: true,
      showNotice: false,
      newsList: [],
      timer: null,
      longClick: 0,
      timeOutEvent: 0,
      islongPress: false,
      isHover: false
    };
  },
  components: {
    loadingCom
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
          return dayNum + "天前";
        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
          // //注释("一天之内");
          // var time = newData - diffTime;
          var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
          return dayNum + "小时前";
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
          // //注释("一小时之内");
          // var time = newData - diffTime;
          var dayNum = Math.floor(diffTime / (60 * 1000));
          return dayNum + "分钟前";
        }
      }
    }
  },
  mounted() {
    this["user/actionGetUserInfo"]();
    this["init/actionGetGameList"]();
    //this.getUserNoticeList()
    this.getUnread();
    let that = this;
    document.addEventListener("click", function() {
      that.showNotice = false;
      //   that.showUserMsg = false;
    });
  },
  watch: {
    loginState: function() {
      if (this.$store.state.user.loginState == 1) {
        this.getUserNoticeList();
        this.getUnread();
        this["user/actionGetUserInfo"]();
      }
    },
    "$store.state.fromClient.call_userInfo_update"() {
      this["user/actionGetUserInfo"]();
    },
    "$store.state.fromClient.call_game_update"() {
      this["init/actionGetGameList"]();
      this.getUserNoticeList();
      this.getUnread();
    },
    "$store.state.fromClient.call_userMsg_update"() {
      this.getUserNoticeList();
      this.getUnread();
    },
    "$store.state.fromClient.call_systemNotice_update"() {
      this.getNewsList();
    }
    // '$store.state.fromClient.call_game_begin_info'(){
    //     this.getUserNoticeList()
    // }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      basicInfo: state => state.user.basicInfo
    })
  },
  methods: {
    userInfoMask() {
      userInfoCom({
        type: 1,
        basicInfo: this.$store.state.user.basicInfo,
        gameList: this.$store.state.init.gameList,
        saveFn: userName => {
          this.saveUserNikeName(userName);
        },
        editorPlayerName: json => {
          this.$store.commit("user/setPlayName", json);
        }
      });
    },
    async saveUserNikeName(name) {
      let res = await updatedNickname({
        nickName: name
      });
      if (res.code == 200) {
        this.isShow = false;
        this.$store.commit("user/setName", name);
      }
    },
    childOut() {
      this.isHover = false;
    },
    childHover() {
      this.isHover = true;
    },
    start(e) {
      if (!this.isHover) {
        let that = this;
        if (e.button == 0) {
          this.timeOutEvent = setTimeout(() => {
            this.islongPress = true;
            that.longPress();
          }, 10);
        }
        return false;
      }
    },
    longPress() {
      this.timeOutEvent = 0;
      clearTimeout(this.timeOutEvent);
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 4,
        data: { msg: "头部拖拽" }
      });
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
      return false;
    },
    end(e) {
      if (e.button == 0) {
        clearTimeout(this.timeOutEvent);
        //window.$nuxt.$store.dispatch('toClient/sendMsg',{type:5,data:{'msg':'结束拖拽'}})
        if (this.timeOutEvent != 0 && this.islongPress) {
          //此处我点击
          this.islongPress = false;
          window.$nuxt.$store.dispatch("toClient/sendMsg", {
            type: 5,
            data: { msg: "结束拖拽" }
          });
        }
      }
      return false;
    },
    drageStop() {
      //clearInterval(this.timer)
      // window.$nuxt.$store.dispatch('toClient/sendMsg',{type:5,data:{'msg':'头部拖拽'}})
    },
    showNoticeFn() {
      this.showNotice = !this.showNotice;
      if (this.showNotice) {
        this.getNewsList();
        this.showUserMsg = false;
      }
    },
    miniWindowFn() {
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 3,
        data: { msg: "缩小窗口" }
      });
    },
    closeWindowFn() {
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 2,
        data: { msg: "关闭窗口" }
      });
    },
    loginOut,
    async getUnread() {
      let res = await getUserNoticeList(this.current, this.size, false);
      if (res.code == 200) {
        this.totalMsg = res.data.total;
      }
    },
    async getUserNoticeList() {
      let res = await getUserNoticeList(this.current, this.size, "");
      if (res.code == 200) {
        this.isLoading = false;
        this.totalUserMsgPage = Math.ceil(res.data.total / this.size);
        if (this.current == 1) {
          this.userNewsList = res.data.records;
        } else {
          res.data.records.forEach(element => {
            this.userNewsList.push(element);
          });
        }
      }
    },
    async getNewsList() {
      let res = await getNewsList(1, 5, false);
      if (res.code == 200) {
        this.showNotice = true;
        this.totalPage = 1;
        this.isLoading = false;
        if (this.current == 1) {
          this.newsList = res.data.records;
        } else {
          res.data.records.forEach(element => {
            this.newsList.push(element);
          });
        }
      }
    },
    ...mapActions([
      "login/actionShowLoginBox",
      "init/actionGetGameList",
      "user/actionGetUserInfo"
    ]),
    toLogin() {
      this["login/actionShowLoginBox"]();
    },
    showUserMsgFn() {
      this.current = 1;
      this.showUserMsg = !this.showUserMsg;
      if (this.showUserMsg) {
        this.showNotice = false;
        this.getUserNoticeList();
      }
    },
    lookDetailFn(item) {
      let self = this;
      item.isRead = true;
      self.$maskCom({
        title: item.title,
        txt: [item.message],
        firstBtnTxt: "确定",
        firstBtnFn: () => {
          this.showNotice = false;
        }
      });
      if (self.totalMsg > 1) {
        self.totalMsg -= 1;
      } else {
        self.totalMsg = 0;
      }
      self.updateNotifyToRead(item.userNotifyId);
    },
    lookNewSDetailFn(item) {
      let that = this;
      this.$maskCom({
        title: "",
        txt: [item.title, item.summary],
        firstBtnTxt: "查看更多",
        firstBtnFn: () => {
          // that.$router.push({
          //     path:'/news/detail/'+item.id
          // })
          let host = window.location.hostname;
          window.$nuxt.$store.dispatch("toClient/sendMsg", {
            type: 6,
            data: {
              msg: "打开新闻详情",
              src: host + "/news/detail/" + item.newsId
            }
          });
        }
      });
    },
    async updateNotifyToRead(id) {
      let res = await updateNotifyToRead({
        notifyId: id
      });
    },
    loadeMoreFn() {
      this.current += 1;
      this.showUserMsg = true;
      this.getUserNoticeList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
$headerHeight: 70px;
.windowBtn {
  margin: 10px 0 0 20px;
  right: 10px;
  top: 6px;
  .miniBtnIcon {
    margin-right: 10px;
  }
}
.orange-btn-radius {
  margin-top: 20px;
}
.header {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: #13151d;
  height: $headerHeight;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  -webkit-user-select: none;
  padding: 0 80px 0 20px;
  // border-top: 4px solid rgba(163,174,255,0.2);
  // border-left: 4px solid rgba(163,174,255,0.2);
  // border-right: 4px solid rgba(163,174,255,0.2);
  // border-style: inset;
  .logo {
    height: $headerHeight;
    float: left;
    overflow: hidden;
  }
  .right {
    float: right;
    line-height: $headerHeight;
  }
}

.list {
  float: left;
  li {
    float: left;
    line-height: $headerHeight;
    // width: 90px;
    margin-left: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    a {
      color: rgba(207, 207, 207, 1);
      transition: all 0.2s;
    }
    &:hover {
      a {
        color: rgba(255, 249, 249, 1);
      }
    }
  }
  .nuxt-link-active {
    &:hover {
      color: $yellowActive !important;
    }
  }
}
.header .nuxt-link-active {
  color: $yellow;
}
.right {
  float: right;
  line-height: $headerHeight;
  height: $headerHeight;
  height: 100%;
}
.btn.login {
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  text-align: center;
  width: $headerHeight;
  height: 30px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
}
.user-info {
  li {
    float: left;
    width: 50px;
    margin-right: 20px;
    height: $headerHeight;
  }
}
.user-box {
  width: auto !important;
  margin-right: 0 !important;
  .left {
    float: left;
    width: 50px;
    height: $headerHeight;
  }
  .right {
    float: left;
    width: auto;
    line-height: 24px;
    > p {
      padding-top: 14px;
      > span {
        float: left;
      }
      .logout {
        margin-left: 10px;
        float: left;
        text-decoration: underline;
        color: rgba(255, 255, 255, 0.6);
        &:hover {
          color: #fff;
        }
      }
    }
    > div {
      .left {
        float: left;
        margin-right: 10px;
        width: auto;
      }
      .right {
        float: left;
      }
    }
  }
}

.badge {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: rgba(212, 3, 0, 1);
  border-radius: 50%;
  position: relative;
  &.noticeBadge {
    top: 22px;
    width: 10px;
    height: 10px;
    right: 12px;
  }
  &.newsBadge {
    top: 14px;
    right: 0px;
  }
  i {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
  }
}
.userImg {
  width: 36px;
  height: 36px;
  border-radius: 50px;
  margin-top: 16px;
}
.newListCon {
  // .upTrigleBig,
  // .upTrigleSmall {
  //     width: 0;
  //     height: 0;
  //     border-width: 0 14px 12px;
  //     border-style: solid;
  //     border-color: transparent transparent rgba(54, 61, 75, 1); /*透明 透明  灰*/
  //     margin: 40px auto;
  //     left: 12px;
  //     top: 18px;
  //     z-index: 10;
  // }
  .upTrigleSmall {
    width: 20px;
    height: 11px;
    background: url("../../assets/img/icon/sanj.png") no-repeat center;
    top: 60px;
    z-index: 100;
    left: 14px;
  }
}
.msgCon {
  width: 346px;
  background: rgba(28, 32, 38, 1);
  border: 1px solid rgba(54, 61, 75, 1);
  top: 69px;
  left: -46px;
  z-index: 99;
  h4 {
    line-height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    text-indent: 20px;
  }
  .msgListCon {
    max-height: 400px;
    overflow-y: auto;
    min-height: 100px;
    &.noticeListCon {
      overflow: hidden;
      height: 200px;
    }
  }
  ul {
    width: 100%;
    li {
      height: 40px;
      width: 100%;
      line-height: 40px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.8);
      border-top: 1px solid rgba(54, 61, 75, 1);
      text-indent: 10px;
      overflow: hidden;
      &:last-child {
        border-bottom: 0;
      }
      &.isRead {
        .ells1 {
          color: rgba(255, 255, 255, 0.2);
          i {
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
      .ells1 {
        width: 74%;
        i {
          width: 6px;
          height: 6px;
          background: #34b2fa;
          border-radius: 50px;
        }
      }
      .time {
        color: rgba(255, 255, 255, 1);
        width: 26%;
        color: rgba(255, 255, 255, 0.2);
        i {
          color: rgba(255, 255, 255, 0.5);
          vertical-align: top;
          margin-top: -2px;
        }
        b {
          width: 50px;
          height: 40px;
          display: inline-block;
        }
      }
    }
  }
}
.diamondIcon {
  margin-right: 4px;
}
.goldIcon {
  margin-right: 4px;
  margin-top: 2px;
}
</style>
