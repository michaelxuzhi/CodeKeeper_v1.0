// 云函数入口文件
const cloud = require('wx-server-sdk')
const CryptoJS = require('./public.js')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  // var arr_1 = new Array();
  // for (var i = 0; i < event.length; i++) {
  //   arr_1.push({
  //     account: CryptoJS.Decrypt(event.account_in),
  //     date: CryptoJS.Decrypt(event.date_in),
  //   })
  // }

  // return {

  //   // account: CryptoJS.Decrypt(event.account_in),
  //   // nickName: CryptoJS.Decrypt(event.nickName_in),
  //   // date: CryptoJS.Decrypt(event.date_in),

  //   length: event.length,

  //   arr_1,


  //   // passWord_1: CryptoJS.Decrypte((event.passWord_in).substr(1)),
  //   // textareaAValue_1: CryptoJS.Decrypt((event.textareaAValue_in).substr(1)),
  //   // mydata_1 : [account,nickName,date]}
  // }





  var fix = new Array();
  for (var i = 0; i < event.length; i++) {
    if (fix) {
      fix.push({
        "_id": event.record[i],
        "account": CryptoJS.Decrypt(event.acc[i].substr(1)),
        "nickName": CryptoJS.Decrypt(event.nick[i].substr(1)),
        "date": CryptoJS.Decrypt(event.date[i].substr(1)),
        "passWord": CryptoJS.Decrypt(event.pass[i].substr(1)), 
        "textareaAValue": CryptoJS.Decrypt(event.text[i].substr(1)),
      })
    }
  }
  return {
    fix,
  }








}