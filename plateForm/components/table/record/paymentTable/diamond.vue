<template>
    <div class="table" ref="table">
        <div class="table-header">
            <div class="row">
                <div>时间</div>
                <div>订单ID</div>
                <div>货币</div>
                <div>类型</div>
                <div>原因</div>
                <div>数值</div>
                <div>余额</div>
            </div>
        </div>
        <div class="table-body">
            <div class="row"
                v-for="(item,index) in tableData"
                :key="index">
                <div>
                    <span v-text="formatDate(item.createTime)"
                        :title="formatDate(item.createTime)"></span>
                </div>
                <div>
                    <span v-text="item.orderNo"
                        :title="item.orderNo"></span>
                </div>
                <div>
                    <span class="icon-zuans12-10"></span>
                </div>
                <div>
                    <span :title="item.busName"
                        v-text="item.busName"></span>
                </div>
                <div style="min-width:168px;">
                    <span :title="item.remark"
                        v-text="item.remark"></span>
                </div>
                <div>
                    <span v-if="item.tradeType==1"
                        class="red"
                        v-text="'-'+item.diamondAmount"></span>
                    <span v-if="item.tradeType==2"
                        class="green"
                        v-text="'+'+item.diamondAmount"></span>
                </div>
                <div v-text="item.diamondAfterAmount"
                    :title="item.diamondAfterAmount"></div>
            </div>
        </div>
        <get-more @getMoreData="getMoreData"
            :loading="loading"
            :showButton="page.current!=(page.total)&&page.total!=0&&loading==false"
            :showBottom="page.current==(page.total)&&loading==false"></get-more>
        <no-data :show="tableData.length==0&&loading==false"></no-data>
    </div>
</template>

<script>
import GetMore from '@/components/table/getMore'
import NoData from '@/components/table/nodata'
import {
    showDate,
} from '@/assets/utils/time'

import {
    getRecordDiamond
} from '@/request/order'

import { moneyToFixed2 } from '@/assets/utils/numberFn'

export default {
    components: {
        GetMore,
        NoData
    },
    data() {
        return {
            moneyType: 1,
            loading: true,
            tableData: [],
            page: {
                total: 0,    //总条数
                size: 20,    //每页显示条数
                current: 1,  //当前页数
            },
        }
    },
    methods: {
        formatDate(time) {
            return showDate('Y-M-D h:m', time)
        },
        moneyToFixed2,
        initTableData(moneyType) {
            this.moneyType = moneyType
            this.page.current = 1
            this.tableData = []
            this.getData()
        },
        getMoreData() {
            this.page.current += 1
            this.getData()
        },
        async getData() {
            this.loading = true
            let res = await getRecordDiamond({
                page: this.page.current,
                pageSize: this.page.size
            })
            this.loading = false
            this.page.total = Math.ceil(res.total / this.page.size)
            this.tableData = [...this.tableData, ...res.list]
            this.$nextTick(() => {
                document.querySelector('.paymentTableBox').style.height = getComputedStyle(this.$refs.table).height
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
.yellow {
    color: $yellow;
}
.red {
    font-size: 20px;
    color: $red;
}
.green {
    font-size: 20px;
    color: $green;
}
$rowHeight:70px;
.table {
    width: 100%;
}
.table-header {
    .row {
        border: 1px solid rgba(53, 61, 77, 1);
        > div {
            background: rgba(36, 42, 53, 1);
            height: 54px;
            line-height: 54px;
            color: rgba(148, 159, 176, 1);
        }
    }
}
.table-body {
    > div {
        height: $rowHeight;
        line-height: $rowHeight;
        background: rgba(34, 38, 49, 1);
    }
    .row {
        border-top: 3px solid #222631;
        > div {
            min-height: $rowHeight;
        }
        &:first-child {
            border-top: 0;
        }
        &:hover {
            > div {
                background: rgba(63, 76, 107, 1);
            }
        }
    }
}
.row {
    overflow: hidden;
    > div {
        float: left;
        width: 14%;
        text-align: center;
        transition: all 0.3s;
        background: rgba(36, 42, 53, 1);
    }
    > div:nth-child(1) {
        width: 15%;
    }
    > div:nth-child(7) {
        width: 15%;
    }
}
</style>
