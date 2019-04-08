//app.js
App({
  data: {
    baseUrl: 'http://39.97.168.69:3000/',
    // baseUrl: 'http://2cgw7h.natappfree.cc/'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getToken();
    
  },
  /**
   * 获取token
   */
  getToken: function() {
    const baseUrl = this.data.baseUrl
    wx.request({
      url: baseUrl + 'weChat/getToken',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.token)
        wx.setStorage({//存储到本地
          key: "token",
          data: res.data.token
        });
      },
      fail: function (res) { },
    })
  },

  //获取openid
  getOpenId: function (js_code){
    const baseUrl = this.data.baseUrl
    wx.request({
      url: baseUrl + 'weChat/getOpenId',
      data: { js_code: js_code },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.openid)
      },
      fail: function(res) {},
    })
  },
  globalData: {
    userInfo: null,
    orderArr: [],
    appid: 'wx70754773b55b3337',
    secret: '499b3ff6864048810d4d9007fd3489e9'
  }
})