<template>
    <div class="w12"
        style="margin-top:35px;">
        <div class="breadcrumb">
            <nuxt-link to="/">首页</nuxt-link>
            <span>/</span>
            <nuxt-link class="active" :to="$PAGE_API.record_payment">收支记录</nuxt-link>
        </div>
        <tab-default style="padding-bottom:1px;margin-top:20px;"
            class="payment-tab"
            :list="tabList"
            @active="actionTab"
            :activeId="activeTabId"></tab-default>
        <div style="position:relative;width:100%;"
            class="paymentTableBox"
            ref="tableBox">
            <diamond-list ref="diamond"
                class="animate-hide-left"
                :class="{'fadeIn-left':activeTabId==1}"></diamond-list>
            <gold-list ref="gold"
                class="animate-hide-right"
                :class="{'fadeIn-right':activeTabId==2}"></gold-list>
        </div>

    </div>
</template>

<script>
import DiamondList from '@/components/table/record/paymentTable/diamond'
import GoldList from '@/components/table/record/paymentTable/gold'
import TabDefault from '@/components/list/tabDefault'

export default {
    components: {
        DiamondList,
        GoldList,
        TabDefault
    },
    data() {
        return {
            tabList: [{
                id: 1,
                name: '钻石',
            }, {
                id: 2,
                name: '金币'
            }],
            activeTabId: 1
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$refs.diamond.initTableData(vm.activeTabId)
        })
    },
    methods: {
        actionTab(id) {
            this.activeTabId = id
            switch (id) {
                case 1:
                    this.$refs.diamond.initTableData(this.activeTabId)
                    break;
                case 2:
                    this.$refs.gold.initTableData(this.activeTabId)
                    break;
                default:
                    this.$refs.diamond.initTableData(this.activeTabId)

                    break
            }

        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>
<style lang="scss">
@import "~assets/style/basicColor.scss";
.payment-tab {
    padding-bottom: 40px !important;
    li {
        height: 40px !important;
        line-height: 40px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        margin-right: 10px;
        background: transparent !important;
        position: relative;
        span {
            font-size: 18px;
            transition: all 0.3s;
        }
        &:after {
            content: "";
            display: block;
            height: 2px;
            background: #949fb0;
            position: absolute;
            width: 0;
            bottom: -10px;
            left: 50%;
            transition: all 0.3s;
        }
        &:hover {
            span {
                color: #fff;
            }
            &:after {
                left: 0;
                width: 100%;
            }
        }
    }
    li.active {
        background: transparent !important;
        span {
            color: #34b2fa;
        }
        &:hover {
            span {
                border-color: #34b2fa;
            }
            &:after {
                left: 0;
                width: 100%;
                background: $blue;
            }
        }
    }
}
</style>


