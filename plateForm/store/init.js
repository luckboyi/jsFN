import { getGameListData } from '@/request/game'

// 用于初始化数据
export const state = () => ({
  gameList: [ //游戏列表数据
    // {
    // gameId: '',//游戏id
    // gameImg: '',//游戏logo
    // gameName: '' //游戏名称
    // }
  ]
})

export const mutations = {
  // 设置游戏列表数据
  setGameList(state, obj) {
    state.gameList = obj
  },
 
}
export const actions = {
  async actionGetGameList({
    commit
  }) {
    // 获取游戏列表数据
    let res=await getGameListData()
    commit('setGameList',res)
  }
}
