import {
  getUserInfoData
} from '@/request/user'
// 支付相关
export const state = () => ({
  loginState: 0,
  basicInfo: {
    "barId": '',
    "diamondCount": 0,
    "canCreateMatch": false,
    "goldCount": 0,
    "level": 0,
    "logoUrl": "",
    "nickName": "",
    "phone": "",
    "rateOfWinning": 0,
    "playerList": [],
    "roomId": 0,
    "teamInfo": {
      "creatorName": "",
      "gameId": 0,
      "joinedUserCount": 0,
      "level": 0,
      "logoUrl": "",
      "name": "",
      "teamGoal": "",
      "teamGoalId": "",
      "teamId": 0,
      "teamMembers": {
        "current": 0,
        "descs": [
          ""
        ],
        "records": [{
          "lastLoginTime": "",
          "nickName": "",
          "role": 0,
          "roleDesc": "",
          "teamUserRefId": 0
        }],
        "size": 0,
        "total": 0
      },
      "totalUserCount": 0,
      "wechatGroupQrcodeUrl": ""
    }
  }
})

export const mutations = {
  // 设置用户基本信息
  setBasicInfo(state, obj) {
    if (obj != null) {
      state.loginState = 1
      state.basicInfo = obj
    }
  },
  setBasicInfoInit(state, obj) {
    state.loginState = 0
    state.basicInfo = {}
  },
  setName(state, name) {
    state.basicInfo.nickName = name
  },
  setPlayName(state, json) {
    let index = state.basicInfo.playerList.findIndex(item => item.gameId == json.gameId)
    if (index != -1) {
      state.basicInfo.playerList[index].playerName = json.playerName
    } else {
      state.basicInfo.playerList.push(json)
    }
  },
  setRoomId(state, val) {
    if (val != null) {
      state.basicInfo.roomId = val
    }
  },
  setMoney(state, val) {
    if (val != null) {
      state.basicInfo.gold = val
    }
  },
  setDiamond(state, val) {
    if (val != null) {
      state.basicInfo.diamond = val
    }
  }
}

export const actions = {
  //获取其他模块的state
  // 获取用户基本信息
  async actionGetUserInfo({
    commit,
    dispatch,
    rootState
  }, msg) {
    let res = await getUserInfoData()
    if (res.data != null) {
      res.data.gameList = rootState.init.gameList
      commit('setBasicInfo', res.data)
      if (res.data.playerList == '') {
        bindGameCom({
          gameLis: rootState.init.gameList,
          firstBtnFn: (json) => {
            commit('setPlayName', json)
          }
        })
      }
      if (msg != undefined && msg != '') {
        dispatch('toClient/sendMsg', {
          type: 0,
          data: {
            msg: '用户信息同步客户端',
            data: res.data,
            codeMsg: msg,
            type: rootState.login.loginWay,
            pwd: rootState.login.pwd
          }
        }, {
          root: true
        })
      }
    }
  },
  userInfoSetInit({
    commit
  }) {
    commit('setBasicInfoInit')
    if (window.$nuxt.$route.name == 'record-payment') {
      window.$nuxt.$router.push({
        path: '/'
      })
    }
  }
}
