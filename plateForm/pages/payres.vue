<template>
    <!-- 支付结果页面 -->
    <div>
        <div class="box w12 content-bg">
            <div class="tac">
                <!-- 支付成功logo -->
                <img src="~/assets/img/icon/success.png"
                    v-if="state==1"
                    alt="成功">
                <!-- 支付失败logo -->
                <img src="~/assets/img/icon/error.png"
                    v-if="state==0"
                    alt="失败">
            </div>
            <h2>
                <span v-if="state==1">订单支付成功</span>
                <span v-if="state==0">订单支付失败</span>
            </h2>
            <!-- 支付失败时显示的提示 -->
            <div class="tac"
                v-if="state==0"
                style="padding-top: 10px;padding-bottom:40px;">
                <b style="font-weight:400;color:rgba(153,153,153,1);">交易异常，请稍候重试</b>
            </div>
            <div class="order-info"
                style="padding-top: 40px;"
                v-if="state==1">
                <!-- 支付方式 -->
                <span style="margin-right:30px;">支付方式：
                    <i v-text="getPayWayName(orderInfo.payWay)"></i>
                </span>
                <!-- 支付金额 -->
                <span>支付金额：&nbsp;&nbsp;
                    <i>&yen;</i>
                    <i v-text="moneyToFixed2(orderInfo.payMoney)"></i>
                </span>
            </div>
            <div>
                <div class="tac"
                    style="padding-top:60px;">
                    <nuxt-link :to="$PAGE_API.index">
                        <div class="orange-btn-radius"
                            style="width:198px;height:44px;line-height:44px;font-size:18px;">
                            前往首页
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { moneyToFixed2 } from '@/assets/utils/numberFn'
import { parseUrl } from '@/assets/utils/url'
import { PAY_PLUGIN } from '@/assets/config/pay'

// request
import {
    getOrderInfoMsg
} from '@/request/order'

export default {
    data() {
        return {
            state: null, //0:失败,1:成功
            orderNo: '', //订单号
            orderInfo: {
                // "orderAmount": 100000,   //支付金额
                // "payWay": 0, //支付方式
                // "payWayName": "支付方式"
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        let state, orderNo
        if (typeof window !== 'undefined') {
            document.querySelector('body').style.overflow=`hidden`
            let oUrl = parseUrl(window.location.href)
            // 获取支付状态
            state = oUrl.params.state
            // 获取支付订单号
            orderNo = oUrl.params.orderNo
        }
        next((vm) => {
            document.title=`${vm.$PROJECT_INFO.name}(充值)`
            vm.state = state
            vm.orderNo = orderNo
            vm.getOrderInfo()
        })
    },
    beforeRouteLeave (to, from, next) {
        document.querySelector('body').style.overflow=`auto`
        next()
    },
    methods: {
        // 获取支付方式名称
        getPayWayName(id) {
            return PAY_PLUGIN.getWayName(id)
        },
        moneyToFixed2,
        // 获取订单相关信息
        async getOrderInfo() {
            let res = await getOrderInfoMsg({
                orderNo: this.orderNo
            })
            this.orderInfo = res
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
.box {
    padding: 100px;
    margin-top: 45px;
}
h2 {
    text-align: center;
    font-size: 20px;
    padding-top: 20px;
}
.order-info {
    text-align: center;
    i {
        font-style: normal;
        color: $yellow;
    }
}
</style>


