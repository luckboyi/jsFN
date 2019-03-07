<template>
  <div class="newsList w12">
    <div class="breadcrumb">
      <nuxt-link to="/">首页</nuxt-link>
      <span>/</span>
      <nuxt-link class="active" to="/myRecord">战绩查询</nuxt-link>
    </div>
    <div class="record-tag">
      <div
        :class="{tagActive:index==tagIndex}"
        v-for="(item,index) in tagList"
        :key="index"
        @click="changeTag(index)"
      >{{item}}</div>
    </div>
    <i-table :columns="columns1" :data="data1" @on-expand="tableExpand"></i-table>
    <div class="paging-wrap" v-if="total>10">
      <Page :total="total" size="small" @on-change="changePage"/>
    </div>
  </div>
</template>
<script>
import expandRow from "./recordExpand";
// request
import { getPubgStatsList } from "@/request/game";

export default {
  data() {
    return {
      tagIndex: 0,
      tagList: ["单排", "双排", "四排"],
      current: 1,
      total: 0,
      roomId: 0,
      columns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row,
                tagIndex: this.tagIndex + 1
              }
            });
          }
        },
        {
          title: "时间",
          key: "matchStartTime"
        },
        {
          title: "排名",
          key: "rank"
        },
        {
          title: "击杀",
          key: "kills"
        },
        {
          title: "伤害",
          key: "damageDealt"
        },
        {
          title: "生存时长",
          key: "timeSurvived"
        },
        {
          title: "爆头率",
          key: "headShotRate"
        }
      ],
      data1: [],
      pageTotal: 120,
      pageNum: 0
    };
  },
  mounted() {
    this.getPubgStatsList();
  },
  methods: {
    async getPubgStatsList(size) {
      let params = {
        current: this.current,
        size: 10,
        modeType: this.tagIndex + 1
      };
      let res = await getPubgStatsList(params);
      this.data1 = res.data.records;
      this.total = res.data.total;
    },
    changePage(i) {
      this.current = i;
      this.getPubgStatsList();
    },
    changeTag(i) {
      this.tagIndex = i;
      this.getPubgStatsList();
    },
    tableExpand(row, status) {
      // console.log(row.roomId);
    }
  }
};
</script>
<style lang="scss">
.newsList {
  color: rgba(128, 128, 138, 1);
  /*底色*/
  .ivu-table {
    background: transparent;
  }
  .ivu-table-body {
    // > table {
    //   border-collapse: separate;
    //   border-spacing: 0px 10px;
    // }
  }
  .ivu-table-wrapper {
    border: 0;
  }
  .ivu-table:after {
    width: 0;
  }
  .ivu-table:before {
    height: 0;
  }
  .ivu-table td {
    background-color: #303a51;
    color: #d3d3d3;
  }
  .ivu-table-header th {
    color: #a3a5a7;
    font-weight: bold;
    background-color: #212c31;
    border: none;
  }
  .ivu-table td,
  .ivu-table th {
    border-bottom: 1px solid #21232c;
  }
  td.ivu-table-expanded-cell {
    padding: 0;
  }
  .ivu-page-item-jump-next:after,
  .ivu-page-item-jump-prev:after {
    display: inline;
  }
  .record-tag {
    margin-bottom: 30px;
    > div {
      width: 80px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      &.tagActive {
        color: #00ffff;
      }
    }
  }
  .breadcrumb {
    font-size: 14px;
    margin: 8px 0 20px;
  }
  .paging-wrap {
    margin-top: 20px;
    .ivu-page.mini {
      text-align: right;
    }
    .ivu-page-item {
      background: transparent;
    }
    .ivu-page-next,
    .ivu-page-prev {
      background: transparent;
    }
    .ivu-page-item a {
      color: #515a6e !important;
    }
    .ivu-page-item-active a,
    .ivu-page-item-active:hover a,
    .ivu-page-item a:hover {
      color: #ff9900 !important;
    }
  }
}
</style>