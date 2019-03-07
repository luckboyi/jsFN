// 用于初始化数据
export const state = () => ({
  ProducData: { //游戏列表数据
    // {
    // productsData:{},//商品信息 
    // stepId: '',//商品配置步骤
    // selectNum: '',//商品选中信息
    // allNum: '' //商品总数
    // }
  },
  userRole: 1 //0为网吧业主 1为其他
})

export const mutations = {
  // 设置游戏列表数据
  setProducData(state, obj) {
    state.ProducData = obj
  },
  setProducPrice(state, text) {
    state.ProducData.goodsList.goodsPrice = text
  },
  setUserRole(state, str) {
    state.userRole = str
  },
}
