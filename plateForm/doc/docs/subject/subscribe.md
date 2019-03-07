# 客户端通讯
___
- 客户端（源源负责）

+ 向客户端发送消息
```js
window.$nuxt.$store.dispatch('toClient/sendMsg', {
    event: 0,   //协商好的事件id
    data:'这是消息'
})
```

+ 接收客户端的消息
    + 在store/fromClient/getMsg模块中注册，dispatch调用其他各模块的方法
```js
/**
 * 接收客户端发送消息,json格式
 * {"Type":0,"data":"This is msg"}
 */
export const actions = {
    // 显示微信支付窗口
    getMsg({}, data) {
        if (data.Type !== undefined) {
            switch (data.Type) {
                case 0: //  在这里订阅消息类型
                    console.log("收到消息啦")   
                    break
                default:
                    console.log("未注册的类型id")
            }
        }
    }
}

```