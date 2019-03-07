import {payHref} from '@/assets/config/env'

let handle_href=payHref
if (process.env.NODE_ENV === 'development') {
    handle_href = "http://192.168.100.82/pay/orderPay.do"   //跳转支付平台处理页面
    // handle_href = "http://192.168.103.252:8081/pay/orderPay.do"   //跳转支付平台处理页面
}

export const PAY_PLUGIN={
    handle_href,//跳转支付平台处理页面
    // handle_href:"http://pay.zhuanbar.com:8084/pay/orderPay.do",//跳转支付平台处理页面
    redirectUrl:2,
    way_list:[{
        id:1,
        icon:'icon-alipay',
        name:'支付宝',
        iframeShow:true
    },{
        id:2,
        icon:'icon-wxpay',
        name:'微信支付',
        iframeShow:true
    }],
    getWayName(id){
        for(let item of this.way_list){
            if(item.id==id){
                return item.name
            }
        }
    },
    getRedirectUrl(payData,first,second){
        first=first||"";
        second=second||"";
        first= first == "" ? "" : (first+"-");
        second= second == "" ? "" : (second+"-");
        let redirect_href=`${PAY_PLUGIN.handle_href}?pay_way=${payData.paytype}&sign=${payData.sign}&timestamp=${payData.timestamp}&WIDout_trade_no=${payData.orderNo}&WIDtotal_amount=${payData.money}&passport_name=${payData.passport_name}&WIDsubject=`+encodeURIComponent(`${first}${second}${payData.goods_name}`)+"&WIDbody="+encodeURIComponent(payData.goods_name)+"&payModel=4&redirect="+PAY_PLUGIN.redirectUrl;
        return redirect_href;
    }
}