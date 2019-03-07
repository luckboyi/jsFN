/**
 * 给客户端推送
 * js_event_normal = -1,
	js_event_login = 0,
	js_event_loginout, 1
	js_event_close,2
	js_event_min,3
	js_event_mousedown,4
	js_event_moveEnd,5
	js_event_customQQ,6
    js_can_create_room,7
    js_can_begin_game,8
    js_can_get_barId,9
    js_can_get_create_room,10 //手动
    js_event_get_roomId,11//获取roomid
 */
export const actions = {
    /**
     * 给客户端推送消息
     * {"event":0,"data":"This is msg"}
     * @param {*} data 
     */
    sendMsg({},data) {
        // 用于注释
        if (process.env.NODE_ENV === 'development') {
            console.log("发送给客户端消息：")
        }
        console.log(data)
        var json = JSON.stringify(data);
        try {
            //window.OnEventProc(json)
            window.external.OnEventProc(json)
        } catch (e) {
            // maskCom({
            //     'txt':['非客户端环境'],
            //     firstBtnTxt:'前往下载中心',
            //     firstBtnFn:() => {
            //         window.location.href ='/download'
            //     }
            // })
            console.log("非客户的环境")
        }
    }
}
