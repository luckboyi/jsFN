import {
  apiPre
} from '@/assets/config/env'

let baseUrl = apiPre
if (process.env.NODE_ENV === 'development') {
  baseUrl = process.env.proxyUrl
}

export const PROJECT_INFO = {
  name: '巅峰电竞-- 电竞比赛服务平台'
}

export const PAGE_API = {
  // 首页
  index: "/",
  // 新闻
  news: "/news",
  // 商城
  //   shop: `${baseUrl}/common/withoutCodeRedirect?redirect=http://shop.zhuanbar.com/tokenLogin`,
  shop: '/shop',
  // 充值
  recharge: "/recharge",
  // 战队
  warTeam: "/team",
  // faq
  faq: "/faq",
  // 下载中心
  download: "/download",
  // 个人中心
  personalCenter: "/personalCenter",
  //充值记录
  record_recharge: '/record/recharge',
  //收支记录
  record_payment: '/record/payment',
  //用户协议
  agreement: '/agreement',
  //广告详情(_id就是公告id)
  news_detail: '/news/detail/_id',
  //关于我们
  aboutUs: '/aboutUs',
  //联系我们
  contactUs: '/contactUs',
  // 我的战绩
  myRecord:'/myRecord'
}

export const WEB_API = {
  login: {
    get_sms_code: `/sendSmsCode`, //获取登录短信验证码
    submit: `/loginByPhone`, //登录校验
    whds_submit: `/loginByPassport`, //维护大师登录
    whds_get_sms_code: `/sendSmsByPassport`, //维护大师获取短信验证码
    img_code: `${baseUrl}/verifyImage`, //登录图形验证码
    loginOut: `/loginOut`,
  },
  user: {
    info: `/user/selectUserInfo`,
    updatedNickName: '/user/updateUserNickName',
    get_other_userInfo: '/user/selectOtherUserInfo'
  },
  order: {
    get_order_info: '/diamond/order/query', //查询订单
    get_record_diamond_list: '/diamond/log/queryIncomeList', //获取钻石收支记录
    get_record_gold_list: '/gold/log/queryIncomeList', //获取金币收支记录
    get_order_list: '/diamond/order/queryList',
  },
  recharge: {
    get_diamond_list: `/diamond/goods/query`, //获取展示套餐列表
    to_buy_diamond: `/diamond/goods/buy`, //支付充值的钻石套餐
  },
  game: {
    get_game_list: `/game/getGameInfo`, //获取游戏列表
    get_my_match_list: `/match/getPassportMatchWebDataSrouce`, //获取个人比赛列表
    // get_my_match_list:`/match/getMyMatchDataSrouce`,//获取个人比赛列表
    get_person_match_list: `/match/getMyMatchWebDataSrouce`, //获取个人比赛列表
    get_office_match_list: `/match/getOfficialMatchWebDataSrouce`, //获取官方比赛列表
    get_office_child_match_list: `/match/getOfficialMatchDetailsWebDataSrouce`, //获取官方比赛子类列表
    SetNoticeBuildGame: `/match/noticeBuildGame`, //赛事准备开始
    getPubgStatsList: `/stats/getPubgStatsList`, //用户比赛列表
    getPubgMatchStatsList: `/stats/getPubgMatchStatsList`, //比赛战绩数据
  },
  other: {
    get_banner_list: `/game/getBannerList`
  },
  team: {
    get_allTeam_list: '/team/selectTeamList', //获取战队列表
    get_team_info: '/team/warTeamInfo', //获取战队信息
    get_myTeam_info: '/team/selectMyTeam', //获取我的战队信息
    get_myTeam_applyMember: '/team/selectMyTeamApplications', //获取我的战队成员列表
    get_myTeam_member: '/team/selectTeamMembers', //获取我的战队成员列表
    create_team: '/team/createTeam', //提交创建战队信息
    join_team: '/team/applyJoinTeam', //加入战队申请
    promote_team_rule: '/team/promoteTeamMemberRole', //提升战队成员的权限
    downgrage_team_rule: '/team/downgradeTeamMemberRole', //降低战队成员的权限
    remove_team_member: '/team/deleteTeamMember', //移除战队成员
    team_apply_list: '/team/selectMyTeamApplications', //战队申请列表,
    team_goals_list: '/team/selectTeamGoals', //获取目标列表
    team_logos_list: '/team/selectTeamLogos', //获取战队logo列表,
    team_apply_agree: '/team/approveTeamJoinApply', //统一加入战队
    team_apply_reject: '/team/rejectTeamJoinApply', //拒绝加入战队
    disbandTeam: '/team/disbandTeam', //解散战队
    quitTeam: '/team/quitTeam', //退出战队
    searchTeamByName: '/team/searchTeamByName', //搜索战队
  },
  userNotice: {
    get_userNotice_list: '/sys/notify/selectUserNotify', //获取用户消息
    update_userNotice_toread: '/sys/notify/updateNotifyToRead' //获取公告
  },
  news: {
    get_news_list: '/sys/news/selectNewsList', //获取新闻列表
    get_news_detail: '/sys/news/selectNewsDetail', //获取新闻详情
  },
  applyOfficial: {
    insertOfficialMatch: '/match/insertOfficialMatch', //申请官方赛事
    applyOfficialGameList: '/' //申请官方赛事列表
  },
  match: {
    getPassPortRoomVcDataSrouce: '/match/getPassPortRoomVcDataSrouce', //我的赛事列表（房间创建者信息）
    getAllRoomPassPortDataSrouce: '/match/getAllRoomPassPortDataSrouce', //房间所有人员列表信息
    passportQuitRoom: '/match/passportQuitRoom', //用户退出房间
    cancelRoom: '/match/cancelRoom', //用户取消房间
    insertRoomPassPort: '/match/insertRoomPassPort', //用户加入房间，扣款
    insertMatch: "/match/insertMatch", //新增个人赛事
    getGemePatternInfo: "/game/getGemePatternInfo", //玩法（游戏模式）信息
    getMyMatchDataSrouce: "/match/getMyMatchDataSrouce", //个人赛事列表
    addPossportRoom: '/match/addPossportRoom', //加入预排队房间
    outPossportRoom: '/match/outPossportRoom', //点返回退出房间
    validateRoomPwd: '/match/validateRoomPwd', //房间密码验证
    getPassportOfficialMatchInfo: '/match/getSetPassportRoomInfo' //我的官方赛事
  },
  bindGameName: {
    gameBind: '/gameBind'
  },
  shop: {
    getShopInfo: '/localshop/shopInfo', //获取商城基本信息
    getGoodsList: '/localshop/getGoodsList', //获取商品列表
    shopRecord: '/shop/netbar/order/selectUserExchange', //获取兑换记录
    getConfigList: '/netbarShop/findUserConfigList', //获取商城配置列表
    getShopProp: '/mallWholenet/goodextractList', //获取商城道具列表
    getProductList: '/netbarShop/sys/getProductList', //获取系统商品列表
    findUserConfigList: '/netbarShop/findUserConfigList', //获取配置列表
    findConfigById: '/netbarShop/findConfigById', //获取指定的商城配置
    saveConfig: '/netbarShop/saveConfig', //修改商城配置
    addConfig: '/netbarShop/addConfig', //新增商城配置
    ownerbars: '/passport/ownerbars', //获取网吧列表

    exchangeOrder: '/mallWholenet/exchangeOrder', //全网商城兑换
    extractOrder: '/mallWholenet/extractOrder', //全网商城提前
    goodList: '/mallWholenet/goodList', //获取全网商城首页商品列表
    goodextractList: '/mallWholenet/goodextractList', //获取全网商城中我的道具(提取)列表
    selectProductList: '/shop/netbar/product/selectProductList', //获取本地网吧商城的商品
    selectUserExchange: '/shop/netbar/order/selectUserExchange', //获取本地网吧商城d的兑换记录
    getUserExchange: '/shop/netbar/order/userExchange', //获取商品二维码


  },
  checkBadWors: {
    checkBadWors: '/common/checkBadWords', //敏感词
  }
}
