/**
 * 获取登录时的短信验证码
 * @param {*手机号} phoneNum 
 */
export const getGameListData = () => {
  return http.usualPost({
    url: WEB_API.game.get_game_list,
  })
}
/**
 * 获取个人比赛列表数据
 * @param {*} data 
 */
export const getPersonMatchListData = data => {
  return http.usualPost({
    url: WEB_API.game.get_person_match_list,
    data
  })
}
/**
 * 获取官方比赛列表数据
 * @param {*} data 
 */
export const getOfficeMatchListData = data => {
  return http.usualPost({
    url: WEB_API.game.get_office_match_list,
    data
  })
}
/**
 * 获取官方子类比赛列表数据
 * @param {*} data 
 */
export const getOfficeMatchChildListData = data => {
  return http.usualPost({
    url: WEB_API.game.get_office_child_match_list,
    data
  })
}

/**
 * 赛事准备开始
 * @param {*} data 
 */
export const SetNoticeBuildGame = data => {
  return http.get({
    url: WEB_API.game.SetNoticeBuildGame,
    data
  })
}

/**
 * 获取比赛规则奖励数据
 * @param {*} data 
 */
export const getMyMatchListData = data => {
  return http.usualPost({
    url: WEB_API.game.get_my_match_list,
    data
  })
}
/**
 * 玩法（游戏模式）信息
 * @param {*} data 
 */
export const getGemePatternInfo = data => {
  return http.usualPost({
    url: WEB_API.match.getGemePatternInfo,
    data
  })
}

/**
 * 用户比赛列表
 * @param {*} data 
 */
export const getPubgStatsList = data => {
  return http.get({
    url: WEB_API.game.getPubgStatsList,
    data
  })
}

/**
 * 比赛战绩数据
 * @param {*} data 
 */
export const getPubgMatchStatsList = data => {
  return http.get({
    url: WEB_API.game.getPubgMatchStatsList,
    data
  })
}