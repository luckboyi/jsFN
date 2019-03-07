/**
 * 获取登录时的短信验证码
 * @param {*手机号} phoneNum 
 */
export const getUserInfoData=()=>{
    return new Promise((resolve,reject)=>{
        http.originGet({
            url:WEB_API.user.info,
        },(res)=>{
            resolve(res)
        })
    })
}

//修改昵称
export const updatedNickname = (data) =>{
    return http.post({
        url:WEB_API.user.updatedNickName,
        data
    })
}

//获取他人的用户信息
export const get_other_userInfo = (uuid) =>{
    return http.get({
        url:WEB_API.user.get_other_userInfo,
        data:{
            uuid:uuid
        }
    })
}

export const bindGame = (gameId,playerName) => {
    return http.post({
        url:WEB_API.bindGameName.gameBind,
        data:{
            gameId:gameId,
            playerName:playerName
        }
    })
}