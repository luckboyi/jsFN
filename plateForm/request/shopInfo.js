// 获取商品列表
export const getGoodsList = parameters => {
  return http.matchPost({
    url: WEB_API.shop.getGoodsList,
    data: parameters //房间ID
  })
}

// 商城基本信息
export const getShopInfo = parameters => {
  return http.matchPost({
    url: WEB_API.shop.getShopInfo,
    data: parameters //房间ID
  })
}

// 商城兑换信息
export const geSshopRecord = parameters => {
  return http.get({
    url: WEB_API.shop.selectUserExchange,
    data: parameters //房间ID
  })
}

// 获取商城配置列表
export const getConfigList = parameters => {
  return http.matchPost({
    url: WEB_API.shop.getConfigList,
    data: parameters //房间ID
  })
}

// 商城商城道具列表
export const getShopProp = parameters => {
  return http.get({
    url: WEB_API.shop.getShopProp,
    data: parameters //房间ID
  })
}
// 获取系统商品列表
export const getProductList = parameters => {
  return http.matchPost({
    url: WEB_API.shop.getProductList,
    data: parameters //房间ID
  })
}
// 获取配置列表
export const findUserConfigList = parameters => {
  return http.post({
    url: WEB_API.shop.findUserConfigList,
    data: parameters //房间ID
  })
}
// 获取指定的商城配置
export const findConfigById = parameters => {
  return http.matchPost({
    url: WEB_API.shop.findConfigById,
    data: parameters //房间ID
  })
}
// 修改商城配置
export const saveConfig = parameters => {
  return http.post({
    url: WEB_API.shop.saveConfig,
    json: parameters //房间ID
  })
}
// 新增商城配置
export const addConfig = parameters => {
  return http.matchPost({
    url: WEB_API.shop.addConfig,
    data: parameters //房间ID
  })
}
// 新增商城配置
export const getOwnerbars = parameters => {
  return http.post({
    url: WEB_API.shop.ownerbars,
    data: parameters //房间ID
  })
}

// 获取全网商城首页商品列表
export const getGoodList = parameters => {
  return http.get({
    url: WEB_API.shop.goodList,
    data: parameters //房间ID
  })
}

// 获取全网商城中我的道具(提取)列表
export const getGoodextractList = parameters => {
  return http.get({
    url: WEB_API.shop.goodextractList,
    data: parameters //房间ID
  })
}

// 获取网吧商城商品
export const getSelectProductList = parameters => {
  return http.get({
    url: WEB_API.shop.selectProductList,
    data: parameters
  })
}
// 获取商品二维码
export const getUserExchange = parameters => {
  return http.post({
    url: WEB_API.shop.getUserExchange,
    json: parameters
  })
}

// 全网商城兑换
export const getExchangeOrder = parameters => {
  return http.get({
    url: WEB_API.shop.exchangeOrder,
    json: parameters
  })
}

// 全网商城兑换
export const getExtractOrder = parameters => {
  return http.get({
    url: WEB_API.shop.extractOrder,
    json: parameters
  })
}
