import { PAGE_API } from "../assets/config/api"

// 登出
export const loginOut=()=>{
    return http.originPost({
        url:WEB_API.login.loginOut
    },(res)=>{
        if(res.code==200){
            window.$nuxt.$store.dispatch('toClient/sendMsg',{type:1,data:{'msg':'退出登录'}})
            window.$nuxt.$store.dispatch('user/userInfoSetInit')
        }else if(res.code==402){
            window.$nuxt.$store.dispatch('user/userInfoSetInit')
        }else{
            _Msg.error(res.msg)
        }
    })
}

/**
 * 获取登录时的短信验证码
 * @param {*手机号} phoneNum 
 */
export const getLoginSmsCode=(data)=>{
    return http.post({
        url:WEB_API.login.get_sms_code,
        data:data
    })
}
export const getLoginSmsCodeWhds=(data)=>{
    return http.post({
        url:WEB_API.login.whds_get_sms_code,
        data:data
    })
}
// 默认登录
export const applyForDefaultLogin=(data)=>{
    return http.post({
        url:WEB_API.login.submit,
        data
    })
}
// 维护大师登录
export const applayForWhdsLogin=(data)=>{
    return http.post({
        url:WEB_API.login.whds_submit,
        data
    })
}
