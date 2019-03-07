<template>
    <div class=table-box
        ref=box>
        <div class="table-header fa-row">
            <div></div>
            <div>赛事名称</div>
            <div>比赛项目</div>
            <div>赛事时间</div>
            <div>举办方</div>
            <div>规则及奖励</div>
            <div>操作</div>
        </div>
        <div class="table-body scrollStyle">
            <div v-for="(item1,index1) in tableData"
                :key="index1">
                <div class="fa-row"
                    @click.prevent.stop="showChildMatch(item1,index1)">
                    <div></div>
                    <div class="ells1"
                        v-text="item1.officialName"
                        :title="item1.officialName"></div>
                    <div style="text-align:center;padding-top:6px;">
                        <div style="width:40px;height:40px;margin:auto;">
                            <div class="zoomImage"
                                :title="item1.gameName"
                                :style="{'background-image':'url('+item1.gameImg+')'}">
                            </div>
                        </div>
                    </div>
                    <div>
                        <span :title="showDate(item1.beginDate)+'-'+showDate(item1.endDate)"
                            v-text="showDate(item1.beginDate)+'-'+showDate(item1.endDate)">
                        </span>
                    </div>
                    <div class="ells1"
                        :title="item1.organizersName"
                        v-text="item1.organizersName"></div>
                    <div>
                        <span class="gray-button"
                            @click.stop="showRule(item1.ruleInfo+'|'+item1.rewardInfo)">查看</span>
                    </div>
                    <div>
                        <div class="blue-btn-radius view-btn"
                            @click.prevent.stop="showChildMatch(item1,index1)">
                            <span v-show="!item1.show">查看比赛</span>
                            <span v-show="item1.show">收起</span>
                        </div>
                    </div>
                </div>
                <transition name="bounce">
                    <div v-show="item1.show">
                        <div class="row"
                            v-for="(item2,index2) in item1.child"
                            :key="index2">
                            <div class="lock">
                                <img src="~assets/img/icon/icon-lock.png"
                                    v-show="item2.isEncrypt==2" />
                            </div>
                            <div style="text-align:center;padding-top:6px;">
                                <div style="width:28px;height:28px;margin:auto;">
                                    <div class="zoomImage"
                                        :title="item2.gameName"
                                        :style="{'background-image':'url('+item2.gameImg+')'}">
                                    </div>
                                </div>
                            </div>
                            <div class="ells1">
                                <span :title="item2.roomAddNum+'/'+item2.roomTotalNum"
                                    v-text="item2.roomAddNum+'/'+item2.roomTotalNum"></span>
                            </div>
                            <div :title="showDate(item2.gameBeginDate)">
                                <span v-text="traferVisibleMarchTime(item2.gameBeginDate)"></span>
                            </div>
                            <div class="ells1"
                                :title="item2.gameServer"
                                v-text="item2.gameServer"></div>
                            <div class="ells1"
                                :title="item2.gameMap"
                                v-text="item2.gameMap"></div>
                            <div class="ells1"
                                :title="item2.patternName"
                                v-text="item2.patternName"></div>
                            <div class="ells1"
                                :title="item2.nickName">
                                <nuxt-link :to="$store.state.user.basicInfo.uuid == item2.passportUuid ? '/personalCenter':`/personalInfo/${item2.passportUuid}`"
                                    
                                    style="text-decoration:underline;"
                                    v-text="item2.nickName"></nuxt-link>
                            </div>
                            <div>
                                <span class="gray-button"
                                    @click="showRule(item2.ruleReward)">查看</span>
                            </div>
                            <div class="ells1 icon-cell"
                                :title="item2.totalMoney+'金币'">
                                <span class="icon-jinb16-16"
                                    style="position:relative;top:3px;"></span>
                                <span v-text="item2.totalMoney"
                                    class="ells1"></span>
                            </div>
                            <div class="ells1 icon-cell"
                                :title="item2.enrollMoney+'钻石'">
                                <span class="icon-zuans12-10"></span>
                                <span v-text="item2.enrollMoney"
                                    class="ells1"></span>
                            </div>
                            <div>
                                <div class="blue-btn-radius join-btn"
                                    @click="join(item2)">加入</div>
                            </div>
                        </div>
                        <no-data :show="!item1.child||item1.child.length==0"></no-data>
                    </div>
                </transition>
            </div>
            <get-more @getMoreData="getMoreData"
                :loading="loading"
                :showButton="page.current!=(page.total)&&page.total!=0&&loading==false"
                :showBottom="page.current==(page.total)&&loading==false"></get-more>
            <no-data :show="tableData.length==0&&loading==false"></no-data>
        </div>
        <!-- <div class="table-body" style="text-align:center;padding-top:40px;">
            赛事加载中...
        </div> -->

    </div>
</template>

<script>
import GetMore from '@/components/table/getMore'
import NoData from '@/components/table/nodata'
import {
    showDate,
    traferVisibleMarchTime
} from '@/assets/utils/time'
// request
import {
    getOfficeMatchListData,
    getOfficeMatchChildListData
} from '@/request/game'
import {addPossportRoom,validateRoomPwd} from '@/request/match'
// 自动刷新计时器
let refreshInterval;

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
            global: {
                gameId: null,
            }
        }
    },
    methods: {
        // 获取表格数据
        async refreshData(gameId, eventId) {
            this.gameId = gameId
            this.sortTableData({})
        },
        async sortTableData({
            asc,
            desc
        }) {
            this.current = 1
            this.tableData = []
            this.loading = true
            let res = await getOfficeMatchListData({
                gameId: this.gameId,
                current: this.page.current,
                size: this.page.size
            })
            this.loading = false
            this.page.total = Math.ceil(res.total / this.page.size)
            this.tableData = res.records
            this.$nextTick(() => {
                // document.querySelector('.match-table-content').style.height = getComputedStyle(this.$refs.box).height
            })
            clearInterval(refreshInterval)
            refreshInterval = setTimeout(() => {
                if (this.page.current == 1) {
                    this.sortTableData({ asc, desc })
                }
            }, 600000)
        },
        async getMoreData() {
            this.page.current += 1
            this.loading = true
            let res = await getOfficeMatchListData({
                gameId: this.global.gameId,
                current: this.page.current,
                size: this.page.size
            })
            this.loading = false
            this.tableData = [...this.tableData, ...res.records]
            this.$nextTick(() => {
                // document.querySelector('.match-table-content').style.height = getComputedStyle(this.$refs.box).height
            })
        },
        // 获取官方子类比赛列表
        async showChildMatch(item, index) {
            if (!item.show) {
                let res = await getOfficeMatchChildListData({
                    officialId: item.officialId,
                    current: 1,
                    size: 100000000
                })
                item.child = res.records
            }

            item.show = item.show ? 0 : 1
            this.$forceUpdate()
            this.$nextTick(() => {
                document.querySelector('.match-table-content').style.height = getComputedStyle(this.$refs.box).height
            })
        },
        join(item) {
            //this.$emit('showModal', 'downClient')
            let that = this
            that.$emit('joinGame', item.roomId)
            // if(this.$store.state.user.basicInfo.nickName !=''){
            //     if(item.isEncrypt == 2){
            //         gameRomeCom({
            //             type:4,
            //             firstBtnTxt:'确定',
            //             firstBtnFn:(pwd) => {
            //                 this.validateRoomPwd(item,pwd)
            //             }
            //         })
            //     }else{
            //         this.addPossportRoom(item)
            //     }
            // }else{
            //     maskCom({
            //         txt: ['您暂未登录或登录超时，请前往登录！'],
            //         firstBtnTxt: '前往登录',
            //         firstBtnFn: () => {
            //             $nuxt.$store.dispatch('login/actionShowLoginBox')
            //         }
            //     })
            // }
        },
        async validateRoomPwd(item,pwd){
            let that = this
            let res = await validateRoomPwd({
                roomId:item.roomId,
                pwd:pwd,
            })
            if(res.code == 200){
                that.$emit('joinGame', item.roomId)
            }else{
                maskCom({
                    title:'提示',
                    txt: [res.msg],
                    firstBtnTxt: '确定'
                })
            }
        },
        async addPossportRoom(item){
            let that = this
            let res = await addPossportRoom({
                roomId:item.roomId
            })
            if(res.code == 200){
                that.$emit('joinGame', item.roomId)
                //that.$store.commit('user/setRoomId',item.roomId)
            }else{
                maskCom({
                    title:'提示',
                    txt: [res.msg],
                    firstBtnTxt: '确定'
                })
            }
        },
        showRule(ruleData) {
            this.$emit('showRule', ruleData)
        },
        traferVisibleMarchTime,
        showDate(time) {
            return showDate('Y年M月D日', time)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/components/index/table.scss";

.nodata {
    padding-top: 10px;
    padding-bottom: 10px;
}

.table-header {
    > div {
        height: 34px;
        line-height: 34px;
        background: rgba(34, 38, 48, 1);
        color: rgba(163, 165, 167, 1);
    }
    &.fa-row {
        > div:nth-child(7) {
            width: 130px!important;
        }
    }
}
.fa-row {
    overflow: hidden;
    border-top: 1px solid rgba(34, 38, 48, 1);
    box-sizing: border-box;
    cursor: pointer;
    > div {
        float: left;
        text-align: center;
        font-size: 14px;
    }
    > div:nth-child(1) {
        width: 40px;
    }
    > div:nth-child(2) {
        width: 160px;
    }
    > div:nth-child(3) {
        width: 90px;
    }
    > div:nth-child(4) {
        width: 270px;
        span {
            font-size: 12px;
        }
    }
    > div:nth-child(5) {
        width: 160px;
    }
    > div:nth-child(6) {
        width: 100px;
    }
    > div:nth-child(7) {
        width: 124px;
    }
}
.table-body {
    .fa-row {
        > div {
            height: 52px;
            line-height: 52px;
            color: rgba(228, 228, 228, 1);
            background: rgba(44, 53, 74, 1);
            transition: all 0.3s;
        }
        &:hover {
            > div {
                // background:rgba(44,53,74,1);
                background: rgba(86, 97, 121, 1);
            }
        }
    }
    .row:first-child {
        > div {
            border-top: none;
        }
    }
    .row > div {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-top: 1px solid #4f596e;
        background: rgba(48, 58, 81, 1);
        background: #1d212c;
        color: rgba(212, 212, 212, 1);
    }
}
.view-btn {
    width: 92px;
    height: 22px;
    line-height: 22px;
    margin-top: 14px;
}
.row {
    overflow: hidden;
    border-top: 1px solid rgba(34, 38, 48, 1);
    box-sizing: border-box;
    width: 100%;
    > div {
        float: left;
        text-align: center;
        font-size: 12px !important;
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
        width: 70px;
    }
    > div:nth-child(6) {
        width: 70px;
    }
    > div:nth-child(7) {
        width: 90px;
    }
    > div:nth-child(8) {
        width: 80px;
    }
    > div:nth-child(9) {
        width: 80px;
    }
    > div:nth-child(10) {
        width: 80px;
    }
    > div:nth-child(11) {
        width: 80px;
    }
    > div:nth-child(12) {
        width: 124px;
    }
}
</style>
