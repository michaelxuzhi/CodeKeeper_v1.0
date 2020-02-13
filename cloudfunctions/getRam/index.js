// 云函数入口文件
const cloud = require('wx-server-sdk')
const CryptoJS = require('./public.js')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  var ram_char = String.fromCharCode(Math.floor(Math.random() * 6) + 'A'.charCodeAt(0))
  // var ram_num = Math.floor((Math.random() * 9)).toString()

  return {
    account: ram_char + CryptoJS.Encrypt(event.account) ,
    nickName: ram_char + CryptoJS.Encrypt(event.nickName) ,
    passWord: ram_char + CryptoJS.Encrypt(event.passWord),
    textareaAValue: ram_char + CryptoJS.Encrypt(event.textareaAValue) ,
    date: ram_char + CryptoJS.Encrypt(event.date) ,


    account_de: CryptoJS.Decrypt((ram_char + CryptoJS.Encrypt(event.account)).substr(1)),
    nickName_de: CryptoJS.Decrypt((ram_char + CryptoJS.Encrypt(event.nickName)).substr(1)),
    passWord_de: CryptoJS.Decrypt((ram_char + CryptoJS.Encrypt(event.passWord)).substr(1)),
    textareaAValue_de: CryptoJS.Decrypt((ram_char + CryptoJS.Encrypt(event.textareaAValue)).substr(1)),
    date_de: CryptoJS.Decrypt((ram_char + CryptoJS.Encrypt(event.date)).substr(1)),
  }
}