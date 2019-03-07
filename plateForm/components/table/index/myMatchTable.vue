<template>
  <div class="table-box" ref="box">
    <div class="table-header row">
      <div>状态</div>
      <div>游戏</div>
      <div>
        <tableheader-sort
          :title="'当前人数'"
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
      <div>模式</div>
      <div>
        <tableheader-sort
          :title="'总奖金'"
          @active="activeSortData(20)"
          :asc="sort.id==20&&sort.type"
          :desc="sort.id==20&&!sort.type"
        ></tableheader-sort>
      </div>
      <div>报名费</div>
      <div>收益</div>
      <div></div>
    </div>
    <div class="table-body scrollStyle">
      <div class="row" v-for="(item,index) in tableData" :key="index">
        <div class="state">
          <span
            :class="{'blue':item.roomState==1,'mainCol':item.roomState==2}"
            v-text="getMatchStateName(item.roomState)"
          ></span>
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
        <div class="ells1" v-else :title="formatDate(item.roomBeginDate)">
          <span v-text="formatDate(item.roomBeginDate)"></span>
        </div>
        <div class="ells1" v-text="item.patternName" :title="item.patternName"></div>
        <div class="ells1" :title="item.totalMoney+'金币'">
          <span v-text="item.totalMoney"></span>
          <span class="icon-jinb16-16" style="position:relative;top:3px;"></span>
        </div>
        <div class="ells1" :title="item.enrollMoney+'钻石'">
          <span class="icon-zuans12-10"></span>
          <span v-text="item.enrollMoney"></span>
        </div>
        <div class="ells1 yellow" :title="item.rewardGold+'金币'">
          <span class="icon-jinb16-16" style="position:relative;top:3px;"></span>
          <span v-text="(item.rewardGold>0?'+':'')+item.rewardGold"></span>
        </div>
        <div class="ells1 cp" @click="cancelMatchFn(item)">
          <span v-if="item.roomState==1">取消</span>
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
import NoData from "@/components/table/nodata";
import TableheaderSort from "@/components/table/tableheaderSort";

import { showDate, traferVisibleMarchTime } from "@/assets/utils/time";

import { getMatchStateName } from "@/assets/config/paramMap";

// request
import { getPersonMatchListData, getMyMatchListData } from "@/request/game";
import { cancelRoom } from "@/request/match";
// 自动刷新计时器
let refreshInterval;

export default {
  components: {
    GetMore,
    NoData,
    TableheaderSort
  },
  props: {
    type: Number
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
        current: 0 //当前页数
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
      if (index != -1) {
        this.tableData[index].roomState = roomState;
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
    //取消比赛
    cancelMatchFn(item) {
      maskCom({
        title: "提示",
        txt: ["确定是否取消本场比赛"],
        firstBtnTxt: "是",
        firstBtnFn: () => {
          this.cancelRoom(item);
        },
        secBtnTxt: "否"
      });
    },
    async cancelRoom(item) {
      let res = await cancelRoom({ roomId: item.roomId });
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 11,
        data: { roomId: 0 }
      });
      window.$nuxt.$store.dispatch("toClient/sendMsg", {
        type: 12,
        data: { msg: "获取roomId" }
      });
      item.roomState = 5;
    },
    getMatchStateName,
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
    async sortTableData({ asc, desc }) {
      // 默认时间排序
      this.page.current = 1;
      this.tableData = [];
      this.loading = true;
      let res = await getMyMatchListData({
        type: this.type,
        gameId: this.global.gameId,
        current: 1,
        size: this.page.size,
        asc,
        desc
      });
      this.loading = false;
      this.page.total = Math.ceil(res.total / this.page.size);
      this.tableData = res.records;
      this.$nextTick(() => {
        // document.querySelector('.match-table-content').style.height=getComputedStyle(this.$refs.box).height
      });
      clearInterval(refreshInterval);
      refreshInterval = setTimeout(() => {
        if (this.page.current == 1) {
          this.sortTableData({
            asc,
            desc
          });
        }
      }, 600000);
    },
    async getMoreData() {
      this.page.current += 1;
      let res = await getMyMatchListData({
        type: this.type,
        gameId: this.global.gameId,
        current: this.page.current,
        size: 20,
        asc: this.sortKey.asc,
        desc: this.sortKey.desc
      });
      this.tableData = [...this.tableData, ...res.records];
      this.$nextTick(() => {
        // document.querySelector('.match-table-content').style.height=getComputedStyle(this.$refs.box).height
      });
    },
    join() {
      this.$emit("showModal", "downClient");
    },
    showRule(ruleData) {
      this.$emit("showRule", ruleData);
    },
    traferVisibleMarchTime,
    formatDate(time) {
      return showDate("Y-M-D h:m", time);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/components/index/table.scss";
@import "~assets/style/basicColor.scss";
.table-box {
  width: 950px;
}
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
  .yellow {
    color: $yellow !important;
  }
  .state {
    color: rgba(156, 156, 156, 1);
  }
  .blue {
    color: #34b2fa !important;
  }
  > div:nth-child(1) {
    width: 110px;
  }
  > div:nth-child(2) {
    width: 70px;
  }
  > div:nth-child(3) {
    width: 120px;
  }
  > div:nth-child(4) {
    width: 140px;
  }
  > div:nth-child(5) {
    width: 120px;
  }
  > div:nth-child(6) {
    width: 120px;
  }
  > div:nth-child(7) {
    width: 100px;
  }
  > div:nth-child(8) {
    width: 100px;
  }
  > div:nth-child(9) {
    width: 70px;
  }
}
</style>
