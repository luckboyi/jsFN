<template>
    <div>
        <!-- 公共登录窗口/用于全局 -->
        <login-box></login-box>
        <!-- 微信支付窗口/用于全局 -->
        <wx-pay></wx-pay>
    </div>
</template>
<script>
// 登录框
import LoginBox from '@/components/modals/loginBox/index' 
// wx and alipay
import WxPay from '@/components/modals/wxPay' 

export default {
    name:'modals',
    components:{
        LoginBox,
        WxPay
    }
}

</script>

