
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  env: {
    // proxyUrl: 'http://192.168.100.21:80/api',
    // proxyUrl: 'http://192.168.100.242:8080/app/mock/31',
    // proxyUrl: 'http://192.168.103.47:81/api',
    proxyUrl: "/api",
    // baseUrl: '/api'
  },
  server: {
    port: 3100, // default: 3000
    host: '192.168.100.206', // default: localhost,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '巅峰电竞 -- 电竞比赛服务平台',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '巅峰电竞是一个即时、便利的电竞赛事服务平台。成立战队，发起比赛，获得现金奖励，走上电竞巅峰，成为人生赢家。'
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        name: 'Keywords',
        content: '电竞,电子竞技,比赛,电竞比赛,绝地求生,PUBG,吃鸡,比赛奖励,战队,排名,对战平台,lol,王者荣耀,英雄联盟,dota2,csgo'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=7,IE=9'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=7,9'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=Edge,chrome=1'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png'
    }],
    script: [{
        src: 'https://hm.baidu.com/hm.js?6f80f0203396c3187e9ae6fbc2ede620'
      },
      {
        src: '/laydate/laydate.js'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/reset.css',
    '~/assets/style/global.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~plugins/before',
      ssr: true
    },
    {
      src: '~plugins/iview',
      ssr: true
    },
    '~plugins/ga.js'
  ],
  performance: {
    hints: false
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    middleware: 'init'
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    presets: ['es2015', 'stage-0'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
