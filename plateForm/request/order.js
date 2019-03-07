/**
 * 获取订单信息数据
 * @param {*手机号} phoneNum 
 */
export const getOrderInfoMsg=(data)=>{
    return http.msgPost({
        url:WEB_API.order.get_order_info,
        data
    })
}

/**
 * 获取充值记录
 * @param {*手机号} phoneNum 
 */
export const getRecordRecharge=(data)=>{
    return http.usualPost({
        url:WEB_API.order.get_order_list,
        data
    })
}

/**
 * 获取钻石收支记录
 */
export const getRecordDiamond=(data)=>{
    return http.usualPost({
        url:WEB_API.order.get_record_diamond_list,
        data
    })
}

/**
 * 获取金币收支记录
 */
export const getRecordGold=(data)=>{
    return http.usualPost({
        url:WEB_API.order.get_record_gold_list,
        data
    })
}