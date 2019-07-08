const app = getApp()
// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      {
        key: 'in_theaters',
        name: '正在热映'
      },
      {
        key: 'coming_soon',
        name: '即将上映'
      },
      {
        key: 'top250',
        name: '排名前250电影榜单'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMovies() {
    wx.showLoading({ title: '拼命加载中...' })
    const moviesList = this.data.movies.map(movie => {
      return app.douban.find(movie.key, 0, 20).then(res => {
        for (let i in res.subjects) {
          res.subjects[i].rating.starList = this.dealStar(res.subjects[i].rating.stars);
        }
        movie.detail = res
        return movie
      })
    })
    Promise.all(moviesList).then(res => {
      this.setData({
        movies: res
      })
      wx.hideLoading();
    })
  },
  dealStar(star) {
    star.substring(0, 1);
    var listAll = [];
    for (let i = 0; i < 5; i++) {
      if (i < Number(star.substring(0, 1))) {
        listAll.push(1);
      } else {
        listAll.push(0);
      }
    }
    return listAll;
  },
  routerTodetail(event) {
    wx.navigateTo({
      url: '/pages/list-item/list-item?id=' + event.currentTarget.dataset.id
    })
  },
  handleClick(e) {
    let name = e.currentTarget.dataset.name;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({ url: '/pages/listMore/listMore?name=' + name + '&title=' + title });
  },
  onLoad: function (options) {
    this.getMovies();
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