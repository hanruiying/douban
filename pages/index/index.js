//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    isShow: true
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    this.getInfo();
  },
  handleRouter() {
    // 点击跳转的页面
    wx.switchTab({url: '/pages/movie/movie'});
  },
  onGotUserInfo(data) {
    if(data.detail.rawData) {
      this.getInfo();
      this.setData({
        isShow: false
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  getInfo () {
    // 获取微信用户的信息
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          isShow: false
        })
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: (err) => {
        this.setData({
          isShow: true
        })
        console.log(err, 'err');
      }
    })
  }
})
