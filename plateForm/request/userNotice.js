
//获取用户信息列表
export  const getUserNoticeList = (current,size,isRead) => {
    if(isRead != false){
        isRead =''
    }
    return http.get({
        url:WEB_API.userNotice.get_userNotice_list,
        data:{
            current:current, 
            size:size,
            isRead:isRead
        }
    })
}
//阅读消息
export const updateNotifyToRead = data =>{
    return http.usualPost({
        url:WEB_API.userNotice.update_userNotice_toread,
        data
    })
}
//获取新闻列表
export const getNewsList = (current,size,type) => {
    return http.get({
        url:WEB_API.news.get_news_list,
        data:{
            current:current, 
            size:size,
            type:type
        }
    })
}
//获取新闻详情
export const getNewsDetail = (id) => {
    return http.get({
        url:WEB_API.news.get_news_detail,
        data:{
            id:id
        }
    })
}