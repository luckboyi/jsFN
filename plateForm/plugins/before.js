import '@babel/polyfill'
import Vue from 'vue'
// dom操作方法
import domFn from '~/assets/utils/domFn'
// 动画处理
import _Move from '~/assets/utils/move'

// 信息提醒
import _Msg from '~/assets/utils/_Msg'
// 日志输出
import _log from '~/assets/utils/_log'
// 接口地址
import {
  PROJECT_INFO,
  WEB_API,
  PAGE_API
} from '@/assets/config/api'
// 接口请求
import http from '~/assets/utils/http'

Vue.prototype.$PROJECT_INFO = PROJECT_INFO
Vue.prototype.$WEB_API = WEB_API
Vue.prototype.$PAGE_API = PAGE_API
Vue.prototype.$domFn = domFn
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import maskCon from '@/components/modals/mask'
import gameResult from '@/components/gameResult/index'
import gameRomeCon from '@/components/modals/gameRome/index'
import userInfo from '@/components/userInfo/index.vue'
import bindGame from '@/components/modals/bindGame/index'
import shopTake from '@/components/shop/take'
import tips1 from '@/components/gameResult/tips1'
import tips2 from '@/components/gameResult/tips2'
import autoTips from '@/components/gameResult/autoTips'


let maskConContructor = Vue.extend(maskCon)
let gameResultContructor = Vue.extend(gameResult)
let gameRomeConContructor = Vue.extend(gameRomeCon)
let userInfoContructor = Vue.extend(userInfo)
let bindGameContructor = Vue.extend(bindGame)
let shopTakeContructor = Vue.extend(shopTake)
let tips1Contructor = Vue.extend(tips1)
let tips2Contructor = Vue.extend(tips2)
let autoTipsContructor = Vue.extend(autoTips)

export const shopTakeCom = (params) => {
  let shopTakeDom = new shopTakeContructor().$mount()
  if (params != undefined) {
    document.body.appendChild(shopTakeDom.$el)
  }
  params != undefined ? shopTakeDom.params = params : ''
}

export const maskCom = (params) => {
  let maskConDom = new maskConContructor().$mount()
  var bindGameObj = document.getElementById('maskCon')
  if (bindGameObj != null) {
    bindGameObj.parentNode.removeChild(bindGameObj)
  }
  if (params != undefined) {
    document.body.appendChild(maskConDom.$el)
  }
  params != undefined ? maskConDom.params = params : ''
}
export const gameResultCom = (params) => {
  let gameResultComDom = new gameResultContructor().$mount()
  if (params != undefined) {
    document.body.appendChild(gameResultComDom.$el)
  }
  params != undefined ? gameResultComDom.params = params : ''
}
export const gameRomeCom = (params) => {
  let gameRomeComDom = new gameRomeConContructor().$mount()
  var bindGameObj = document.getElementById('maskCon')
  if (bindGameObj != null) {
    bindGameObj.parentNode.removeChild(bindGameObj)
  }
  if (params != undefined) {
    document.body.appendChild(gameRomeComDom.$el)
  }
  params != undefined ? gameRomeComDom.params = params : ''
}
export const userInfoCom = (params) => {
  let userInfoComDom = new userInfoContructor().$mount()
  if (params != undefined) {
    document.body.appendChild(userInfoComDom.$el)
  }
  params != undefined ? userInfoComDom.params = params : ''
}
export const bindGameCom = (params) => {
  let bindGameComDom = new bindGameContructor().$mount()
  var bindGameObj = document.getElementById('bindGame')
  if (bindGameObj != null) {
    bindGameObj.parentNode.removeChild(bindGameObj)
  }
  if (params != undefined) {
    document.body.appendChild(bindGameComDom.$el)
  }
  params != undefined ? bindGameComDom.params = params : ''
}
export const tips1Com = (params) => {
  let tips1ComDom = new tips1Contructor().$mount()
  if (params != undefined) {
    document.body.appendChild(tips1ComDom.$el)
  }
  params != undefined ? tips1ComDom.params = params : ''
}
export const tips2Com = (params) => {
  let tips2ComDom = new tips2Contructor().$mount()
  var bindGameObj = document.getElementById('maskCon')
  if (bindGameObj != null) {
    bindGameObj.parentNode.removeChild(bindGameObj)
  }
  if (params != undefined) {
    document.body.appendChild(tips2ComDom.$el)
  }
  params != undefined ? tips2ComDom.params = params : ''
}
export const autoTipsCom = (params) => {
  let autoTipsComDom = new autoTipsContructor().$mount()
  if (params != undefined) {
    document.body.appendChild(autoTipsComDom.$el)
  }
  params != undefined ? autoTipsComDom.params = params : ''
}
Vue.prototype.$shopTakeCom = shopTakeCom
Vue.prototype.$maskCom = maskCom
Vue.prototype.$gameResultCom = gameResultCom
Vue.prototype.$gameRomeCom = gameRomeCom
Vue.prototype.$userInfoCom = userInfoCom
Vue.prototype.$bindGameCom = bindGameCom
Vue.prototype.$tips1Com = tips1Com
Vue.prototype.$tips2Com = tips2Com
Vue.prototype.$autoTipsCom = autoTipsCom


// import http from '~/assets/utils/request'
if (process.client) {
  // Vue.prototype.resetSetItem = function (key, newVal) {
  //     if (key === 'watchStorage') {
  //         // 创建一个StorageEvent事件
  //         var newStorageEvent = document.createEvent('StorageEvent');
  //         const storage = {
  //             setItem: function (k, val) {
  //                 sessionStorage.setItem(k, val);
  //                 // 初始化创建的事件
  //                 newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
  //                 // 派发对象
  //                 window.dispatchEvent(newStorageEvent)
  //             }
  //         }
  //         return storage.setItem(key, newVal);
  //     }
  //  }
  // IE9报错兼容
  window.history.replaceState = window.history.replaceState || function () {}

  // 方法全局化
  window.WEB_API = WEB_API
  window.PAGE_API = PAGE_API
  window.PROJECT_INFO = PROJECT_INFO
  window._Msg = _Msg
  window.http = http
  window._log = _log

  window.shopTakeCom = shopTakeCom
  window.maskCom = maskCom
  window.gameResultCom = gameResultCom
  window.gameRomeCom = gameRomeCom
  window.domFn = domFn
  window.userInfoCom = userInfoCom
  window.bindGameCom = bindGameCom
  window.tips1Com = tips1Com
  window.tips2Com = tips2Com
  window.autoTipsCom = autoTipsCom
  //通过vue中fromClient模块,订阅客户端传送过来的方法
  window.PlatformNotify = (type, data) => {
    var text
    if (type == 20 || type == 0 || type == 18 || type == 19 || type == 23 || type == 24) {
      text = {
        type: type,
        data: data
      }
    } else {
      text = {
        type: type,
        data: data.data
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('收到客户端消息：');
      console.log(data)
    }
    if (window.$nuxt) {
      if (type == 0) {
        if (data != '') {
          maskCom({
            txt: [data]
          })
        }
      } else {
        window.$nuxt.$store.dispatch('fromClient/getMsg', text)
      }
    }
  }
  // 与客户端通讯测试组件
  // setTimeout(()=>{
  // 	PlatformNotify(JSON.stringify({Type:0}))
  // },3000)
  // setTimeout(() => {
  //     if (window.$nuxt) {
  //         window.$nuxt.$store.dispatch('toClient/sendMsg', {
  //             event: 0
  //         })
  //     }
  // }, 3000)
}
