// 赛事房间状态
const matchStateNameList = {
  '1': '未开始',
  '2': '已开始',
  '3': '系统取消',
  '4': '人工取消',
  '5': '用户取消',
  '6': '已结束',
  '99': '其他',
  'default': '其他'
}
export const getMatchStateName = (id) => {
  return matchStateNameList[id]
}

// 订单状态名称
const orderStateNameList = {
  '0': '待支付',
  '1': '支付完成',
  '2': '订单取消'
}
export const getOrderStateName = (id) => {
  return orderStateNameList[id]
}


// 段位名称
const paragraphNameList = {
  '0': {
    img: '/static/img/paragraph/paragraph_baiyin.png',
    name: '白银'
  },
  '1': {
    img: '/static/img/paragraph/paragraph_huangjin.png',
    name: '黄金'
  },
  '2': {
    img: '/static/img/paragraph/paragraph_baijin.png',
    name: '白金'
  }, //   
  '3': {
    img: '/static/img/paragraph/paragraph_zuanshi.png',
    name: '钻石'
  },
  '4': {
    img: '/static/img/paragraph/paragraph_dashi.png',
    name: '大师'
  },
  '5': {
    img: '/static/img/paragraph/paragraph_wangzhe.png',
    name: '王者'
  },
}
export const getParagraphStaticData = (percent) => {
    switch(true){
        case percent>80:
            return paragraphNameList['5']
            break
        case percent>70:
            return paragraphNameList['4']
            break
        case percent>60:
            return paragraphNameList['3']
            break
        case percent>50:
            return paragraphNameList['2']
            break
        case percent>40:
            return paragraphNameList['1']
            break
        default:
        return paragraphNameList['0']
    }
}
