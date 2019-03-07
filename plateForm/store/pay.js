// 支付模块

export const state = () => ({
    wxModalShow:false,  //微信支付模态窗显示
    wxModalSrc:'',   //微信模态窗显示地址
})

export const mutations = {
    setWxModalShow(state,bool){
        state.wxModalShow=bool
    },
    setWxModalSrc(state,src){
        state.wxModalSrc=src
    }
}

export const actions = {
    // 显示微信支付窗口
    actionShowWxModal({
        commit
    },src){
        commit('setWxModalSrc',src)
        commit('setWxModalShow',true)
    },
    // 隐藏微信支付窗口
    actionHideWxModal({
        commit
    }){
        commit('setWxModalSrc','')
        commit('setWxModalShow',false)
    }
}
