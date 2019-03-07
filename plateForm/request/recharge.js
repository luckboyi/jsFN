/**
 * 获取套餐列表
 * @param {*手机号} phoneNum 
 */
export const getDiamondListData=()=>{
    return http.usualPost({
        url:WEB_API.recharge.get_diamond_list,
    })
}
// 购买钻石列表
export const toBuyDiamond=(data)=>{
    return http.post({
        url:WEB_API.recharge.to_buy_diamond,
        data
    })
}