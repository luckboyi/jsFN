import userInfoCom from './index'

const userInfo ={
  install:(Vue) => {
    Vue.component('userInfoCom',userInfoCom)
  }
}
export default userInfo