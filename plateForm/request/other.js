// banner
export const getbannerListData=()=>{
    return http.usualPost({
        url:WEB_API.other.get_banner_list,
        data:{
            type:1
        }
    })
}
//敏感词校验
export const checkBadWords = (data) =>{
    return http.post({
        url:WEB_API.checkBadWors.checkBadWors,
        data:{
            context:data 
        }
    })
}