// miniprogram/pages/info/info.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata: [],
    color: ["#BF3EFF", "#8E388E", "#63B8FF", "#FF1493"],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //时间轴界面的小点颜色，采用随机颜色
    var color1 = this.data.color[Math.floor(Math.random() * this.data.color.length)];
    var color2 = this.data.color[Math.floor(Math.random() * 3)];

    this.setData({
      colormy: color1,
      colormy1: color2
    })


    db.collection("AC").where({
      id_sec: 'pry0128_xu'
    }).get({
      success: res => {
        
        var length_1 = res.data.length;
        var acc_1 = new Array();
        var nick_1 = new Array();
        var date_1 = new Array();
        var pass_1 = new Array();
        var text_1 = new Array();
        var record_1 = new Array();

        for(var i = 0 ; i<res.data.length;i++){
          acc_1.push(res.data[i].account)
          nick_1.push(res.data[i].nickName)
          date_1.push(res.data[i].date)
          pass_1.push(res.data[i].passWord)
          text_1.push(res.data[i].textareaAValue)
          record_1.push(res.data[i]._id)
        };
        wx.cloud.callFunction({
          name:"decrypt",
          data:{
            length :length_1,
            acc :acc_1,
            nick : nick_1,
            date : date_1,
            pass : pass_1,
            text : text_1,
            record : record_1
          },
          success:res=>{
            this.setData({
              mydata :res.result.fix
            })
          },
          fail:res=>{
            console.log(res);
          }
        })
      },
      fail: err => {
        console.log(error);
      }
    })
  },

  touchstart(e) {
    this.startTime = e.timeStamp;
    // console.log(e.timeStamp);
  },

  touchend(e) {
    this.endTime = e.timeStamp;
    // console.log(e.timeStamp);
  },

  longpress(event) {
    if (this.endTime - this.startTime > 350);
    // console.log("长按");
    let id = event.currentTarget.dataset.id;
    // console.log(event)
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (e) {
        if (e.confirm) {
          // 用户点击了确定 可以调用删除方法了
          const db = wx.cloud.database();
          db.collection("AC").doc(id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              } //删除成功重新加载
            },
            fail: err => {
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        } else if (e.cancel) {
          // console.log('用户点击取消')
        }
      }
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
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
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

  }
})