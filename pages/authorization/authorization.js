// pages/authorization/authorization.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success:  res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              //用户已经授权过
              const userInfo = res.userInfo
              wx.setStorage({//存储到本地
                key: "userInfo",
                data: userInfo
              });
              const openid = wx.getStorageSync('openid');
              if (openid == "") {
                wx.login({
                  success: (res) => {
                    if (res.code) {
                      this.getOpenId(res.code, userInfo.nickName, userInfo.gender)
                    }
                  }
                })
              }
              else {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          });
         
          
        }
      }
    })
  },

  /*
   *点击授权登陆按钮
   */
  bindGetUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      wx.setStorage({//存储到本地
        key: "userInfo",
        data: e.detail.userInfo
      });
      var that = this;
      //获取openid
      wx.login({
        success:  res => {
          if (res.code) {
            this.getOpenId(res.code, userInfo.nickName, userInfo.gender)
          }
        }
      })     
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '请授权之后浏览社区信息',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

/**
 * 获取openid 
 */
  getOpenId: function (js_code, nickName, gender) {
    const baseUrl = this.data.baseUrl
    wx.request({
      url: app.data.baseUrl + 'weChat/getOpenId',
      data: { js_code: js_code, nickName: nickName, gender: gender },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.openid)
        wx.setStorage({//存储到本地
          key: "openid",
          data: res.data.openid
        });
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail: function (res) { },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})