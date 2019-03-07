let baseUrl=''
if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.proxyUrl
}

export const WEB_API={
    team:{
        get_allTeam_list:'/selectTeamList', //获取战队列表
        get_team_info:'/warTeamInfo',//获取战队信息
        get_myTeam_info:'/myTeamInfo',//获取我的战队信息
        create_team:'/createWarTeam',//提交创建战队信息
        join_team:'/warTeamJoin',//加入战队申请
        update_team_rule:'/warTeamUpdateRule',//更新战队成员的权限
        remove_team_member:'/warTeamRemoveMember',//移除战队成员
        team_apply_handle:'/warTeamApplyHandle',//处理战队申请
        team_apply_list:'/warTeamApplyList',//战队申请列表,
        team_logoAndTag_list:'/getWarTeamTagsList',//获取战队列表和目标列表
    }
}