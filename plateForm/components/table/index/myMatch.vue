<template>
    <div class=table-box>
        <tab-default style="padding-bottom:1px;"
            :list="tabList"
            @active="actionTab"
            :activeId="activeId"></tab-default>
        <div class=my-game-box>
            <match-table ref=todayTable
                class="animate-hide-left"
                :type="1"
                :class="{'fadeIn-left':activeId==1}"></match-table>
            <match-table ref="allTable"
                :type="0"
                class="animate-hide-right"
                :class="{'fadeIn-right':activeId==2}"></match-table>
        </div>
    </div>
</template>
<script>
import TabDefault from '@/components/list/tabDefault'
import GetMore from '@/components/table/getMore'
import MatchTable from '@/components/table/index/myMatchTable'

import {
    showDate,
    traferVisibleMarchTime
} from '@/assets/utils/time'

// request
import {
    getPersonMatchListData
} from '@/request/game'

// 自动刷新计时器
let refreshInterval;

export default {
    components: {
        GetMore,
        TabDefault,
        MatchTable
    },
    data() {
        return {
            tabList: [{
                name: '今日',
                id: 1
            }, {
                name: '所有',
                id: 2
            }],
            activeId: 1,
            tableData: [],
            page: {
                total: 0,    //总条数
                size: 20,    //每页显示条数
                current: 0,  //当前页数
            },
            global: {
                gameId: null,
            }
        }
    },
    
    methods: {
        // 获取表格数据
        async refreshData(gameId) {
            this.gameId=gameId
            this.$refs.todayTable.refreshData(gameId)
        },
        actionTab(id) {
            this.activeId = id
            switch(id){
                case 1:
                    this.$refs.todayTable.refreshData(this.gameId)
                    break
                case 2:
                    this.$refs.allTable.refreshData(this.gameId)
                    break
                default:
                    this.$refs.todayTable.refreshData(this.gameId)
                    break
            }
        }
    }
}
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
        width: 140px;
    }
    > div:nth-child(5) {
        width: 80px;
    }
    > div:nth-child(6) {
        width: 60px;
    }
    > div:nth-child(7) {
        width: 60px;
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

.animate-hide-left {
    top: 0;
    position: absolute;
    visibility: hidden;
    left: -20%;
    opacity: 0;
    transition: all 0.4s;
}
.animate-hide-right {
    top: 0;
    position: absolute;
    visibility: hidden;
    right: -20%;
    opacity: 0;
    transition: all 0.4s;
}
.fadeIn-left {
    visibility: visible;
    opacity: 1;
    left: 0px;
}
.fadeIn-right {
    visibility: visible;
    opacity: 1;
    right: 0px;
}
.my-game-box{
    position:relative;
    width:100%;
    position: absolute;
    top: 30px;
    bottom: 0;
}
</style>
