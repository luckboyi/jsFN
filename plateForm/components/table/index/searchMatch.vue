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
        <div class="ells1" :title="formatDate(item.gameBeginDate)">
          <span v-text="traferVisibleMarchTime(item.gameBeginDate)"></span>
        </div>
        <div class="ells1" v-text="item.gameServer" :title="item.gameServer"></div>
        <div class="ells1" v-text="item.gameMap" :title="item.gameMap"></div>
        <div class="ells1" v-text="item.patternName" :title="item.patternName"></div>
        <div class="ells1" :title="item.nickName">
          <nuxt-link
            :to="$store.state.user.basicInfo.uuid == item.passportUuid ? '/personalCenter': `/personalInfo/${item.passportUuid}`"
            style="text-decoration:underline;"
            v-text="item.nickName"
          ></nuxt-link>
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
          <div class="blue-btn-radius join-btn" @click="join">加入</div>
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
    // 获取表格数据
    refreshData(gameId, eventId, roomId) {
      this.global.gameId = gameId;
      this.sort.id = 10;
      this.sort.type = false;
      this.sortTableData({ desc: 10, roomId });
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
    async sortTableData({ asc, desc, roomId }) {
      this.page.current = 1;
      this.tableData = [];
      this.loading = true;
      let res = await getPersonMatchListData({
        roomId,
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
      // clearTimeout(refreshInterval)
      // refreshInterval = setTimeout(() => {
      //     if (this.page.current == 1) {
      //         this.sortTableData({ asc, desc })
      //     }
      // }, 600000)
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
    join() {
      this.$emit("showModal", "downClient");
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
