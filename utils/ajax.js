module.exports = function (url, data, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}