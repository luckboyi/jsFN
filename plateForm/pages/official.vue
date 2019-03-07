<template>
    <div>
        <div class="banner" style="position:relative;top:-1px;">
            <!-- 轮播图 -->
            <swiper-banner ref="banner"></swiper-banner>
        </div>
        <div class="w12 clearfix"
            style="max-width:1200px;">
            <!-- 左侧游戏列表 -->
            <div class="left"
                style="padding-top:66px;z-index:20;position:relative;">
                <game-list ref="gameList"
                    @select="selectGame"></game-list>
            </div>
            <div class="right"
                style="z-index:0;">
                <!-- 右侧赛事tab切换 -->
                <div class="match-tab">
                    <ul>
                        <li :class="{'active':matchId==0}"
                            @click="selectMatch(0)">个人赛事</li>
                        <li :class="{'active':matchId==1}"
                            @click="selectMatch(1)">官方赛事</li>
                        <li v-if="canCreateMatch"
                            :class="{'active':matchId==2}"
                            @click="selectMatch(2)">我的游戏</li>
                    </ul>
                </div>
                <!-- 右侧赛事列表 -->
                <div style="min-height:773px;position:relative;"
                    class="match-table-content">
                    <!-- 个人赛事列表 -->
                    <person-match ref="personMatch"
                        class="animate-hide-bottom"
                        :class="{'fadeIn-bottom z-top':matchId==0}"
                        @showRule="showRule"
                        @showModal="showModal"></person-match>
                    <!-- 官方赛事列表 -->
                    <office-match ref="officeMatch"
                        class="animate-hide-bottom"
                        :class="{'fadeIn-bottom z-top':matchId==1}"
                        @showRule="showRule"
                        @showModal="showModal"></office-match>
                    <!-- 我的游戏列表(我创建的房间) -->
                    <my-match ref="myMatch"
                        v-if="canCreateMatch"
                        class="animate-hide-bottom"
                        :class="{'fadeIn-bottom z-top':matchId==2}"
                        @showRule="showRule"
                        @showModal="showModal"></my-match>
                </div>
            </div>
        </div>
        <!-- 下载客户端模态窗 -->
        <down-client :show.sync="modal.downClient"></down-client>
        <!-- 规则静态窗 -->
        <game-rule ref="gameRule"
            :show.sync="modal.gameRule"></game-rule>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import GameList from '~/components/list/gameList'
import PersonMatch from '~/components/table/index/personMatch'
import OfficeMatch from '~/components/table/index/officeMatch'
import MyMatch from '~/components/table/index/myMatch'
import SwiperBanner from '~/components/swipers/banner'
import DownClient from '~/components/modals/static/downClient'
import GameRule from '~/components/modals/static/gameRule'

export default {
    components: {
        GameList,
        PersonMatch,
        OfficeMatch,
        SwiperBanner,
        DownClient,
        GameRule,
        MyMatch
    },
    data() {
        return {
            matchId: 0,  //0:个人赛事；1:官方赛事
            gameId: 0,
            modal: {
                downClient: false,//下载模态窗
                gameRule: false,//游戏规则模态窗
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            document.title = `${vm.$PROJECT_INFO.name}(首页)`
            setTimeout(() => {
                // 渲染banner
                vm.$refs.banner.init()
                // 渲染赛事
                vm.$refs.gameList.init()
            })

        })
    },
    computed: {
        ...mapState({
            canCreateMatch: state => state.user.basicInfo.canCreateMatch
        })
    },
    methods: {
        // 选择游戏
        selectGame(id) {
            this.gameId = id
            this.selectMatch(this.matchId)
        },
        // 选择比赛
        selectMatch(id) {
            this.matchId = id
            switch (id) {
                case 0://个人比赛
                    this.$refs.personMatch.refreshData(this.gameId, this.matchId)
                    break;
                case 1://官方比赛
                    this.$refs.officeMatch.refreshData(this.gameId, this.matchId)
                    break;
                case 2://官方比赛
                    this.$refs.myMatch.refreshData(this.gameId, this.matchId)
                    break;
                default:
                    this.$refs.personMatch.refreshData(this.gameId, this.matchId)
                    break;
            }
        },
        showModal(val) {
            this.modal[val] = true
        },
        // 显示游戏规则与奖励
        showRule(ruleData) {
            this.$refs.gameRule.showGameRuleReward(ruleData)
            // this.modal['gameRule']=true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/animate/default.scss";

.left {
    float: left;
    width: 220px;
}
.right {
    padding-top: 6px;
    float: left;
    margin-left: 30px;
    width: 950px;
}

.z-top {
    z-index: 10;
}

.match-tab {
    // padding-bottom: 10px;
    ul {
        overflow: hidden;
    }
    li {
        width: 100px;
        line-height: 60px;
        float: left;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        color: rgba(128, 128, 138, 1);
        transition: all 0.3s;
        &:hover {
            color: rgba(211, 211, 211, 1);
        }
        &.active {
            color: rgba(52, 178, 250, 1);
        }
    }
}
</style>
