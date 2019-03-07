import axios from 'axios'
class HttpRequest {
  constructor() {
        this.baseUrl=''
    if (process.env.NODE_ENV === 'development') {
      this.baseUrl = process.env.baseUrl
    }
    this.queue = {}
    this.contentType = ''
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': this.contentType
      }
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
  post(options) {
    options.method = 'post'
    if (options.data) {
      this.contentType = 'application/x-www-form-urlencoded'
      let ret = ''
      for (let it in options.data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(options.data[it]) + '&'
      }
      ret=ret.substring(0,ret.length-1)
      options.data = ret
    }
    if (options.json) {
      this.contentType = 'application/json;charset=utf-8'
      options.data = options.json
      delete options.json
    }
    this.request(options)
  }
  get(options) {
    options.method = 'get'
    this.request(options)
  }
}
export default new HttpRequest()
