wx.cloud.init();
const db = wx.cloud.database();
const app = getApp();
{
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      textareaAValue: "",
      textareaBValue: "",

    },
    ToSignUp() {
      wx.redirectTo({
        url: '../signup/signup',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    search() {
      wx.showModal({
        title: '许植的电话',
        content: '18219300912',
      })
    },

    account: function (e) {

      this.setData({
        account: e.detail.value
      })
    },

    passWord: function (e) {
      this.setData({
        passWord: e.detail.value
      })
    },

    login: function (e) {
      if (!this.data.account || !this.data.passWord) {
        wx.showModal({
          title: '啥也不输入',
          content: '干哈啊，打架啊？！',
        })
        }else{
      wx.cloud.callFunction({
        name: "MD5_test",
        data: {
          a: this.data.account,
          b: this.data.passWord
        },
        success: res => {
         
          wx.cloud.callFunction({
            name: "check_login",
            data: {
              acc: res.result.a,
              pass: res.result.b
            }, success: res => {

              if (res.result.res_login) {
                wx.showLoading({
                  title: '登录中',
                  mask: true
                })
                setTimeout(

                  function () {
                    wx.navigateTo({
                      url: res.result.router + '?id_sec=' + res.result.id_secret,
                    })
                    wx.hideLoading();
                    }, 1000)
                    clearTimeout()
              } else {
                wx.showModal({
                  title: "错误！",
                  content: res.result.router1,
                })
              }
            }         
          })
        }     
      })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.app = getApp();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      // this.app.slideupshow(this,'slide_up_1',200,1);
      setTimeout(function () {
        this.app.slideupshow(this, 'slide_up_1', 300, 1)
      }.bind(this), 20);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      // this.app.slideupshow(this, 'slide_up_1', 200, 0);
      setTimeout(function () {
        this.app.slideupshow(this, 'slide_up_1', -300, 0)
      }.bind(this), 20);

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  })
}