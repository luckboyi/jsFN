<template>
  <div class="table-box" ref="box">
    <div class="table-header row">
      <div></div>
      <div>游戏</div>
      <div>
        <tableheader-sort
          :title="'参赛人数'"
          @active="activeSortData(6)"
          :asc="sort.id==6&&sort.type"
          :desc="sort.id==6&&!sort.type"
        ></tableheader-sort>
      </div>
      <div>
        <tableheader-sort
          :title="'时间'"
          @active="activeSortData(10)"
          :asc="sort.id==10&&sort.type"
          :desc="sort.id==10&&!sort.type"
        ></tableheader-sort>
      </div>
      <div>服务器</div>
      <div>地图</div>
      <div>模式</div>
      <div>发起人</div>
      <div>规则及奖励</div>
      <div>
        <tableheader-sort
          :title="'总奖励'"
          @active="activeSortData(20)"
          :asc="sort.id==20&&sort.type"
          :desc="sort.id==20&&!sort.type"
        ></tableheader-sort>
      </div>
      <div>报名费</div>
      <div>操作</div>
    </div>
    <div class="table-body scrollStyle" style="width:100%;">
      <div class="row" v-for="(item,index) in tableData" :key="index">
        <div class="lock">
          <img src="~assets/img/icon/icon-lock.png" v-show="item.isEncrypt==2">
        </div>
        <div style="text-align:center;padding-top:6px;">
          <div style="width:28px;height:28px;margin:auto;">
            <div
              class="zoomImage"
              :title="item.gameName"
              :style="{'background-image':'url('+item.gameImg+')'}"
            ></div>
          </div>
        </div>
        <div class="ells1">
          <span
            :title="item.roomAddNum+'/'+item.roomTotalNum"
            v-text="item.roomAddNum+'/'+item.roomTotalNum"
          ></span>
        </div>
        <div class="ells1" v-if="item.dataType == 1">
          <span>人满即开</span>
        </div>
        <div class="ells1" v-else :title="formatDate(item.gameBeginDate)">
          <span v-text="traferVisibleMarchTime(item.gameBeginDate)"></span>
        </div>
        <div class="ells1" v-text="item.gameServer" :title="item.gameServer"></div>
        <div class="ells1" v-text="item.gameMap" :title="item.gameMap"></div>
        <div class="ells1" v-text="item.patternName" :title="item.patternName"></div>
        <div class="ells1" :title="item.nickName">
          <a
            href="javascript:;"
            @click="userInfoMask(item.passportUuid)"
            style="text-decoration:underline;"
            v-text="item.nickName"
          ></a>
          <!-- <a href="javascriptL:;"
                        style="text-decoration:underline;"
                        class="cd"
          v-text="item.nickName"></a>-->
        </div>
        <div>
          <span class="gray-button" @click="showRule(item.ruleReward)">查看</span>
        </div>
        <div class="ells1 icon-cell" :title="item.totalMoney+'金币'">
          <span class="icon-jinb16-16" style="position:relative;top:3px;"></span>
          <span v-text="item.totalMoney" class="ells1"></span>
        </div>
        <div class="ells1 icon-cell" :title="item.enrollMoney+'钻石'">
          <span class="icon-zuans12-10"></span>
          <span v-text="item.enrollMoney" class="ells1"></span>
        </div>
        <div>
          <div
            class="blue-btn-radius join-btn"
            @click="join(item)"
            :class="{grayBtn:$store.state.fromClient.roomId>0 || item.roomAddNum == item.roomTotalNum}"
          >加入</div>
        </div>
      </div>
      <get-more
        @getMoreData="getMoreData"
        :loading="loading"
        :showButton="page.current!=(page.total)&&page.total!=0&&loading==false"
        :showBottom="page.current==(page.total)&&loading==false"
      ></get-more>
      <no-data :show="tableData.length==0&&loading==false"></no-data>
    </div>
  </div>
</template>

<script>
import GetMore from "@/components/table/getMore";
import TableheaderSort from "@/components/table/tableheaderSort";
import NoData from "@/components/table/nodata";

import { showDate, traferVisibleMarchTime } from "@/assets/utils/time";

// request
import { getPersonMatchListData } from "@/request/game";
import { addPossportRoom, validateRoomPwd } from "@/request/match";
// 自动刷新计时器
let refreshInterval;

export default {
  components: {
    GetMore,
    TableheaderSort,
    NoData
  },
  data() {
    return {
      loading: true,
      tableData: [],
      sort: {
        id: 10,
        type: false //  false:倒序,true:正序
      },
      page: {
        total: 0, //总条数
        size: 20, //每页显示条数
        current: 1 //当前页数
      },
      global: {
        gameId: null
      }
    };
  },
  watch: {
    "$store.state.fromClient.call_room_player_count"() {
      let roomId = this.$store.state.fromClient.call_room_player_count.roomId;
      let roomAddNum = this.$store.state.fromClient.call_room_player_count
        .roomAddNum;
      let index = this.tableData.findIndex(item => item.roomId == roomId);
      if (index != -1) {
        this.tableData[index].roomAddNum = roomAddNum;
      }
    },
    "$store.state.fromClient.call_commonRoom_update"() {
      let roomId = this.$store.state.fromClient.call_commonRoom_update.roomId;
      let roomState = this.$store.state.fromClient.call_commonRoom_update
        .roomState;
      let index = this.tableData.findIndex(item => item.roomId == roomId);
      if (roomId == this.$store.state.user.basicInfo.roomId) {
        if (roomState != 1) {
          this.$store.commit("user/setRoomId", 0);
          //this.resetSetItem('watchStorage', 0);
        }
      }
      if (index != -1) {
        this.tableData.splice(index, 1);
      } else {
        if (roomState == 1) {
          this.tableData.unshift(
            JSON.parse(
              JSON.stringify(
                this.$store.state.fromClient.call_commonRoom_update
              )
            )
          );
        }
      }
    }
  },
  computed: {
    sortKey() {
      let sortKey;
      if (this.sort.type) {
        sortKey = {
          asc: this.sort.id
        };
      } else {
        sortKey = {
          desc: this.sort.id
        };
      }
      return sortKey;
    }
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
    // 获取表格数据
    refreshData(gameId, eventId) {
      this.global.gameId = gameId;
      this.sort.id = 10;
      this.sort.type = false;
      this.sortTableData({ desc: 10 });
    },
    // 激活排序按钮
    activeSortData(id) {
      if (this.sort.id == id) {
        this.sort.type = !this.sort.type;
      } else {
        this.sort.type = false;
      }
      this.sort.id = id;
      this.sortTableData(this.sortKey);
    },
    // 表格排序字段获取数据
    async sortTableData({ asc, desc }) {
      this.page.current = 1;
      this.tableData = [];
      this.loading = true;
      let res = await getPersonMatchListData({
        gameId: this.global.gameId,
        current: 1,
        size: this.page.size,
        asc,
        desc
      });
      this.loading = false;
      this.page.total = Math.ceil(res.total / 20);
      this.tableData = res.records;
      this.$nextTick(() => {
        // document.querySelector('.match-table-content').style.height = getComputedStyle(this.$refs.box).height
      });
      if (this.page.current == 1) {
        // this.sortTableData({ asc, desc });
      }
      // clearTimeout(refreshInterval);
      // refreshInterval = setTimeout(() => {
      //   if (this.page.current == 1) {
      //     this.sortTableData({ asc, desc });
      //   }
      // }, 2000);
    },
    async getMoreData() {
      this.page.current += 1;
      this.loading = true;
      let res = await getPersonMatchListData({
        gameId: this.global.gameId,
        current: this.page.current,
        asc: 10,
        size: 20,
        asc: this.sortKey.asc,
        desc: this.sortKey.desc
      });
      this.loading = false;
      this.tableData = [...this.tableData, ...res.records];
      this.$nextTick(() => {
        // document.querySelector('.match-table-content').style.height = getComputedStyle(this.$refs.box).height
      });
    },
    join(item) {
      //this.$emit('showModal', 'downClient')
      let that = this;
      // console.log(this.$store.state.user.basicInfo.nickName);
      if (this.$store.state.user.basicInfo.nickName != "") {
        if (item.isEncrypt == 2) {
          gameRomeCom({
            type: 4,
            firstBtnTxt: "确定",
            firstBtnFn: pwd => {
              this.validateRoomPwd(item, pwd);
            }
          });
        } else {
          this.addPossportRoom(item);
        }
      } else {
        maskCom({
          txt: ["您暂未登录或登录超时，请前往登录！"],
          firstBtnTxt: "前往登录",
          firstBtnFn: () => {
            $nuxt.$store.dispatch("login/actionShowLoginBox");
          }
        });
      }
    },
    async validateRoomPwd(item, pwd) {
      let that = this;
      let res = await validateRoomPwd({
        roomId: item.roomId,
        pwd: pwd
      });
      if (res.code == 200) {
        that.$emit("joinGame", item.roomId);
      } else {
        maskCom({
          title: "提示",
          txt: [res.msg],
          firstBtnTxt: "确定",
          firstBtnFn: () => {
            this.join(item);
          }
        });
      }
    },
    async addPossportRoom(item) {
      let that = this;
      that.$emit("joinGame", item.roomId);
      // let that = this
      // let res = await addPossportRoom({
      //     roomId:item.roomId
      // })
      // if(res.code == 200){

      //     //that.$store.commit('user/setRoomId',item.roomId)
      // }else{
      //     maskCom({
      //         title:'提示',
      //         txt: [res.msg],
      //         firstBtnTxt: '确定'
      //     })
      // }
    },
    showRule(ruleData) {
      this.$emit("showRule", ruleData);
    },
    traferVisibleMarchTime,
    formatDate(time) {
      return showDate("Y年M月D日h:m", time);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/components/index/table.scss";

.table-header {
  > div {
    height: 34px;
    line-height: 34px;
    background: rgba(34, 38, 48, 1);
    color: rgba(163, 165, 167, 1);
  }
}
.table-body {
  // background: rgba(48, 58, 81, 1);
  overflow: auto;
  .row {
    &:hover {
      > div {
        background: rgba(63, 76, 107, 1);
      }
    }
    > div {
      transition: all 0.3s;
      height: 40px;
      line-height: 40px;
      background: rgba(48, 58, 81, 1);
      color: rgba(211, 211, 211, 1);
    }
  }
}

.row {
  overflow: hidden;
  border-top: 1px solid rgba(34, 38, 48, 1);
  box-sizing: border-box;
  > div {
    float: left;
    text-align: center;
    font-size: 12px;
  }
  > div:nth-child(1) {
    width: 30px;
  }
  > div:nth-child(2) {
    width: 60px;
  }
  > div:nth-child(3) {
    width: 80px;
  }
  > div:nth-child(4) {
    width: 100px;
  }
  > div:nth-child(5) {
    width: 80px;
  }
  > div:nth-child(6) {
    width: 60px;
  }
  > div:nth-child(7) {
    width: 100px;
  }
  > div:nth-child(8) {
    width: 80px;
  }
  > div:nth-child(9) {
    width: 100px;
  }
  > div:nth-child(10) {
    width: 80px;
  }
  > div:nth-child(11) {
    width: 80px;
  }
  > div:nth-child(12) {
    width: 100px;
  }
}
.table-body {
  .row {
    > div:nth-child(10) {
      text-align: right;
      width: 80px;
    }
  }
}
.icon-cell {
  overflow: hidden;
  > span:nth-child(2) {
    text-align: left;
    float: left;
    width: 52px;
    min-height: 1px;
  }
  > span:nth-child(1) {
    float: left;
    width: 12px;
    margin-left: 12px;
    margin-right: 4px;
    margin-top: 12px;
  }
  .icon-zuans12-10 {
    margin-top: 15px !important;
  }
}
</style>
