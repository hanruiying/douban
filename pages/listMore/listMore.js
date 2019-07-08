const app = getApp()
// pages/listMore/listMore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: [
    ],
    page: 0,
    size: 20,
    hasMore: true, // 第一次进入的标识
    name: '',
    title: ''
  },
  getMovies() {
    // wx.showLoading({ title: '拼命加载中...' });
    wx.showNavigationBarLoading();
    app.douban.find(this.data.title, this.data.page * this.data.size, this.data.size).then(res => {
      if (this.data.hasMore) {
        this.setData({
          movie: res.subjects
        })
        this.setData({
          hasMore: false
        })
      } else {
        this.setData({
          movie: this.data.movie.concat(res.subjects)
        })
      }
      // wx.hideLoading();
      wx.hideNavigationBarLoading();
    })
  },
  routerTodetail(event) {
    // console.log(event, 'event.currentTarget.dataset.id');
    wx.navigateTo({
      url: '/pages/list-item/list-item?id=' + event.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      title: options.title
    })
    this.getMovies();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.name
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onPullDownRefresh() {
    //模拟加载
    // hasMore为标志位，首次加载为true
    this.setData({
      movie: [],
      page: 0,
      hasMore: true
    })
    this.getMovies();
  },
  onReachBottom() {
    // 显示加载图标
    // hasMore非首次加载和刷新为false
    let page = ++this.data.page;
    this.setData({
      hasMore: false,
      page
    })
    this.getMovies()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})