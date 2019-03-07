// 获取战队列表

export const getTeamListData =(gameId,current,size) =>{
    return http.get({
        url:WEB_API.team.get_allTeam_list,
        data:{
            gameId:gameId,
            current:current,
            size:size
        }
    })
}
//获取我的战队信息

export const getMyteamInfo = () =>{
    return new Promise((resolve,reject)=>{
        http.originGet({
            url:WEB_API.team.get_myTeam_info,
        },(res)=>{
            resolve(res)
        })
    })
}
//获取申请列表 
export  const getMyteamApplyList = (current,size) => {
    return http.get({
        url:WEB_API.team.get_myTeam_applyMember,
        data:{
            current:current, 
            size:size
        }
    })
}
//获取我的战队成员列表
export const selectTeamMembers =(teamId,current,size) =>{
    return http.get({
        url:WEB_API.team.get_myTeam_member,
        data:{
            teamId:teamId,
            current:current, 
            size:size
        }
    })
}
//获取战队信息
export const getTeamInfo = (data) => {
    return http.usualPost({
        url:WEB_API.team.get_team_info,
        data
    })
}
//获取战队标志
export const getTeamLogoList = () =>{
    return http.get({
        url:WEB_API.team.team_logos_list,
    })
}
//获取战队目标
export const getTeamGoalsList = () =>{
    return http.get({
        url:WEB_API.team.team_goals_list,
    })
}
//创建战队
export const creatTeamFn = json =>{
    return http.post({
        url:WEB_API.team.create_team,
        json
    })
}
//提高权限
export const promoteFn = json =>{
    return http.post({
        url:WEB_API.team.promote_team_rule,
        json
    })
}
//降低权限
export const downgradeFn = json =>{
    return http.post({
        url:WEB_API.team.downgrage_team_rule,
        json
    })
}
//踢出成员
export const removeMember = json =>{
    return http.post({
        url:WEB_API.team.remove_team_member,
        json
    })
}

//批准加入
export const  applyHandle = json =>{
    return http.post({
        url:WEB_API.team.team_apply_agree,
        json
    })
}
//拒绝加入
export const  rejectHandle = json =>{
    return http.post({
        url:WEB_API.team.team_apply_reject,
        json
    })
}
//申请加入
export const  joinTeamFn = json =>{
    return http.post({
        url:WEB_API.team.join_team,
        json
    })
}

//解散战队
export const  disbandTeam = json =>{
    return http.post({
        url:WEB_API.team.disbandTeam,
        json
    })
}
//解散战队
export const  quitTeam = json =>{
    return http.post({
        url:WEB_API.team.quitTeam,
        json
    })
}
//搜素战队
export const searchTeamByName = (name) =>{
    return http.get({
        url:WEB_API.team.searchTeamByName,
        data:{  
            teamName:name
        }
    })
}