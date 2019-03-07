/**
 * 接收客户端发送消息,json格式
 * {"Type":0,"data":"This is msg"}
 */
import {
  loginOut
} from '@/request/login'
export const actions = {
  // 显示微信支付窗口
  getMsg({
    commit,
    dispatch,
  }, data) {
    if (data.type !== undefined) {
      commit('update', data)
    }
  }
}
const defaultProps = [
  'msg', //0
  'call_game_update', //游戏更新1
  'call_mode_update', // 游戏模式更新2
  'call_commonRoom_update', // 个人比赛更新3
  'call_official_match_update', //官方赛事列表更新4
  'call_official_match_room_update', // 官方赛事房间更新5
  'call_userInfo_update', // 用户信息更新6
  'call_systemNotice_update', //系统公告更新7
  'call_userMsg_update', //玩家消息更新8
  'call_selfRoom_update', //我的游戏 更新9
  'call_roomUser_update', //房间里的玩家信息更新10
  'call_enter_room_update', // 进去房间更新11
  'call_leave_room_udpdate', // 离开房间更新12
  'call_join_game_update', // 加入游戏更新13
  'call_quit_game_update', // 退出游戏更新14
  'call_game_begin_info', //游戏开始信息。15
  'call_create_game_result', //自动化创建房间16
  'call_room_player_count', //游戏房间总数 17
  'call_room_create_bef', //自动化创建房间18
  'call_login_other_place', //退出19
  'call_barId', //获取网报id20
  'call_get_roomId', //21
  'call_room_loading', //22
  'call_room_owner', //23
  'call_talk_other', //24 聊天
  'clll_login_result', //25  C端登录结果
]
export const state = () => ({
  barId: '',
  roomId: '',
  msg: '',
  call_game_update: '', //游戏更新1
  call_mode_update: '', // 游戏模式更新2
  call_commonRoom_update: '', // 个人比赛更新3
  call_official_match_update: '', //官方赛事列表更新4
  call_official_match_room_update: '', // 官方赛事房间更新5
  call_userInfo_update: '', // 用户信息更新6
  call_systemNotice_update: '', //系统公告更新7
  call_userMsg_update: '', //玩家消息更新8
  call_selfRoom_update: '', //我的游戏 更新9
  call_roomUser_update: '', //房间里的玩家信息更新10
  call_enter_room_update: '', // 进去房间更新11
  call_leave_room_udpdate: '', // 离开房间更新12
  call_join_game_update: '', // 加入游戏更新13
  call_quit_game_update: '', // 退出游戏更新14
  call_game_begin_info: '', //游戏开始信息15,
  call_create_game_result: '', //自动化创建房间16
  call_room_player_count: '', //游戏房间总数 17
  call_room_create_bef: '', //自动化创建房间18
  call_login_other_place: '', //退出19
  call_barId: '', //获取网报id20
  call_get_roomId: '', //21
  call_room_loading: '', //22
  call_room_owner: '', //23 房主谈狂 1自动 2 手动
  call_talk_other: '', //24 聊天
  clll_login_result: '', //25 C端登录结果
})
var num = 0
export const mutations = {
  //更新个人赛事的房间状态
  update(state, obj) {
    state.msg = obj
    console.log(obj)
    if (obj.type == 19) {
      maskCom({
        txt: ['账号重复登录，你已被踢下线']
      })
      loginOut()
    } else if (obj.type == 20) {
      if (obj.data != null) {
        state.barId = obj.data
      } else {
        state.barId = 0
      }
    } else if (obj.type == 21) {
      state.roomId = obj.data.roomId
    }
    if (obj.type == 23) {
      num += 1
      var json = {
        num: num,
        type: obj.data
      }
      state[defaultProps[obj.type]] = json
      // if( state[defaultProps[obj.type]] == obj.data){
      //   state[defaultProps[obj.type]] = 10000
      // }else{
      //   state[defaultProps[obj.type]] = obj.data
      // }
    } else if (obj != null && obj != '' && obj.data != null && obj.data != '') {
      state[defaultProps[obj.type]] = obj.data
    } else if (obj != null && obj != '' && obj.msgData != null && obj.msgData != '') {
      state[defaultProps[obj.type]] = obj.msgData
    }
  },
  setroomId(state, id) {
    state.roomId = id
  }
}
