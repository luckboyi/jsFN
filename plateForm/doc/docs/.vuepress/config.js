module.exports = {
    host: '127.0.0.1',
    port: '2224',
    // base:'/doc/vueconf-2/',
    title: '第二届Vue.js开发者大会',
    description: '第二届Vue.js开发者大会',
    plugins: [
        // 搜索插件
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }]
    ],
    themeConfig: {
        sidebar: {
            '/':[
            // {
            //     title: '介绍',
            //     collapsable: false,
            //     children: [
            //         '/subject/',
            //     ]
            // },
            {
                title: '与客户端的消息通知订阅',
                collapsable: false,
                children: [
                    'subject/subscribe'
                ]
            }]
        },
        nav: [{
                text: '主页',
                link: '/'
            }
        ]
    }
}