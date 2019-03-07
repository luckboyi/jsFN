<template>
    <div class="table">
        <div class="table-header">
            <div class="row">
                <div>时间</div>
                <div>订单ID</div>
                <div>货币</div>
                <div>金额</div>
                <div>状态</div>
                <div>数值</div>
            </div>
        </div>
        <div class="table-body">
            <div class="row"
                v-for="(item,index) in tableData"
                :key="index">
                <div>
                    <span :title="formatDate(item.createTime)"
                        v-text="formatDate(item.createTime)"></span>
                </div>
                <div>
                    <span :title="item.orderNo"
                        v-text="item.orderNo"></span>
                </div>
                <div>
                    <span :title="'钻石'"
                        class="icon-zuans12-10"></span>
                </div>
                <div>
                    <span :title="moneyToFixed2(item.diamondGoods.price)"
                        v-text="moneyToFixed2(item.diamondGoods.price)"></span>
                </div>
                <div>
                    <span :title="getOrderStateName(item.orderState)"
                        v-text="getOrderStateName(item.orderState)"></span>
                </div>
                <div class="yellow"
                    v-text="item.diamondGoods.diamondAmount"></div>
                <div v-text="item.money"></div>
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
import { getRecordRecharge } from '@/request/order'
import {
    getOrderStateName
} from '@/assets/config/paramMap'
import {
    showDate,
} from '@/assets/utils/time'

import { moneyToFixed2 } from '@/assets/utils/numberFn'

export default {
    components: {
        GetMore,
        NoData
    },
    data() {
        return {
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
        getOrderStateName,
        initTableData() {
            this.page.current = 1
            this.getData()
        },
        getMoreData() {
            this.page.current += 1
            this.getData()
        },
        async getData() {
            this.loading = true
            let res = await getRecordRecharge({
                page: this.page.current,
                pageSize: this.page.size
            })
            this.loading = false
            this.page.total = Math.ceil(res.total / this.page.size)
            this.tableData = [...this.tableData, ...res.list]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
.yellow {
    color: $yellow;
}

.table {
    width: 100%;
}
$rowHeight:70px;
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
        width: 16%;
        box-sizing: border-box;
        text-align: center;
        transition: all 0.3s;
        background: rgba(36, 42, 53, 1);
    }
    > div:nth-child(1) {
        width: 18%;
    }
    > div:nth-child(6) {
        width: 18%;
    }
}
.nodata {
    text-align: center;
    padding-top: 50px;
}
</style>
