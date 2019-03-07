// 我的赛事列表（房间创建者信息）
export const getPassPortRoomVcDataSrouce = parameters => {
  return http.matchPost({
    url: WEB_API.match.getPassPortRoomVcDataSrouce,
    data: parameters //用户账号信息，可以不传，不传默认返回所有
  })
}
// 房间所有人员列表信息
export const getAllRoomPassPortDataSrouce = parameters => {
  return http.matchPost({
    url: WEB_API.match.getAllRoomPassPortDataSrouce,
    data: parameters //房间ID，传值表示单个房间人员信息，不传，所有房间人员信息
  })
}
// 退出比赛
export const quitRoom = parameters => {
  return http.post({
    url: WEB_API.match.passportQuitRoom,
    data: parameters //房间ID
  })
}
// 取消房间
export const cancelRoom = parameters => {
  return http.post({
    url: WEB_API.match.cancelRoom,
    data: parameters //房间ID
  })
}
// 加入房间、扣款
export const insertRoomPassPort = parameters => {
  return http.matchPost({
    url: WEB_API.match.insertRoomPassPort,
    data: parameters //房间ID
  })
}

// 新增个人赛事
export const insertMatch = parameters => {
  return http.post({
    url: WEB_API.match.insertMatch,
    data: parameters //房间ID
  })
}

//个人赛事列表
export const getMyMatchDataSrouce = parameters => {
  return http.matchPost({
    url: WEB_API.match.getMyMatchDataSrouce,
    data: parameters //房间ID
  })
}

//加入预排队房间
export const addPossportRoom = data => {
  return http.post({
    url:WEB_API.match.addPossportRoom,
    data:data
  })
}
//用户退出房间  返回
export const outPossportRoom = data => {
  return http.post({
    url:WEB_API.match.outPossportRoom,
    data:data
  })
}
//加入房间密码验证
export const validateRoomPwd = data =>{
  return http.post({
    url:WEB_API.match.validateRoomPwd,
    data:data
  })
}
//我的官方赛事
export const getPassportOfficialMatchInfo = data => {
  return http.get({
    url:WEB_API.match.getPassportOfficialMatchInfo,
    data:{
      current:1,
      size:10
    }
  })
}