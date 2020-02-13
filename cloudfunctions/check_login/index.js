// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.acc == '40bd001563085fc35165329ea1ff5c5ecbdbbeef' && event.pass == 'c348c1794df04a0473a11234389e74a236833822'){
    return {
      res_login: true,
      router: '../add/add',
      id_secret: 'pry0128_xu'
      }
  }else{
    return{
      res_login: false,
      router1: '信息错误!'
    }
  }
}