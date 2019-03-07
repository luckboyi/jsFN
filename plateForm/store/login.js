// 登录相关
export const state = () => ({
  showLoginBox: 0, //0:不显示，1显示登录框
  loginWay: null, //0:默认登录,1:维护大师登录,
  pwd: '', //维护大师密码
})
export const mutations = {
  /**
   * @param {*} state 
   * @param {*设置是否显示的登录框，0:不显示，1显示登录框} val 
   */
  setShowLoginBox(state, val) {
    if (val == 0) {
      state.loginWay = null
    } else {
      state.showLoginBox = val
    }
  },
  setLoginWay(state, val) {
    state.loginWay = val
  },
  setLoginPwd(state, val) {
    state.pwd = val
  }
}

export const actions = {
  /**
   * 设置登录成功状态，隐藏所有登录窗口，获取用户基本信息
   */
  actionLoginSuccess({
    commit,
    dispatch,
  }, msg) {
    //window.location.reload()
    dispatch('actionHideLoginBox')
    dispatch('user/actionGetUserInfo', msg, {
      root: true
    })
  },
  //显示默认登录框
  actionShowLoginBox({
    commit
  }) {
    commit('setShowLoginBox', 1)
    setTimeout(() => {
      commit('setLoginWay', 0)
    }, 80)
  },
  //隐藏所有登录框
  actionHideLoginBox({
    commit
  }) {
    commit('setShowLoginBox', 0)
    setTimeout(() => {
      commit('setLoginWay', null)
    }, 80)
  },
  /**
   * 选择登录方式//0:默认登录,1:维护大师登录
   * @param {*} param0 
   * @param {*} val 
   */
  actionSelectLoginWay({
    commit
  }, val) {
    commit('setLoginWay', val)
  },
  actionSelectLoginPwd({
    commit
  }, val) {
    commit('setLoginPwd', val)
  }
}
