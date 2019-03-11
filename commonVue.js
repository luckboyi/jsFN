exports.install = function(Vue,options) {
  Vue.prototype.addFn = function(model,data,callbackFn) {
    console.log(model)
    console.log(data)
    console.log(callbackFn)
  }
}

//在main.js中
//import commonVue from './commonVue
//Vue.use(commonVue)