const app = getApp();
const db = wx.cloud.database();
// var md5 = require('../md5/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    nickName: '',
    passWord: '',
    textareaAValue: 'Something To Record...',
    date: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const year = new Date().getFullYear().toString();
    const month = (new Date().getMonth() + 1).toString();
    const day = new Date().getDate().toString();
    var date = year + '-' + month + '-' + day;
    var id_sec = options.id_sec;
  
    this.setData({
      date: date,
      id_sec : id_sec
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad(options)
    }
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  account(e) {
    this.setData({
      account: e.detail.value
    })
  },

  nickName(e) {
    this.setData({
      nickName: e.detail.value
    })

  },
  password(e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  

submit:function(){
  var that = this;
  wx.cloud.callFunction({
    name:"getRam",
    data:{
      
      account: that.data.account,
      nickName: that.data.nickName,
      passWord: that.data.passWord,
      textareaAValue: that.data.textareaAValue,
      date: that.data.date
    },
    success:res=>{
      db.collection("AC").add({
        data: {
          account: res.result.account,
          nickName: res.result.nickName,
          passWord: res.result.passWord,
          textareaAValue: res.result.textareaAValue,
          date: res.result.date,
          id_sec : that.data.id_sec
        },
        success: res => {
          wx.showToast({
            title: '插入成功',
          })
          
        },
        fail: err => {
          wx.showModal({
            title: '失败',
            content: '网络不给力！',
          })
        },
      })
    },
    fail:err=>{
      console.log(err);
    }
  })
},

  // http: function(event) {
  //   wx.cloud.callFunction({
  //     name: "http"
  //   }).then(res => {
  //     console.log(JSON.parse(res.result))
  //   })
  // }

read:function(e){
  wx.navigateTo({
    url: '../info/info',
  })

},

})