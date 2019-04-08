const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    gender: '1',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.getInfo()
  },

  /**
   * 获取信息
   */
  getInfo: function () {
    const openid = wx.getStorageSync('openid')
    wx.request({
      url: app.data.baseUrl + 'weChat/custom/info',
      method: 'GET',
      data: { openid: openid },
      dataType: 'json',
      success: res => {
        console.log(res.data)
        const info = res.data.info
        this.setData({
          name: info.attr1,
          phone: info.attr2,
          nickName: info.nickName,
          gender: info.gender
        })
      },
      fail: function (res) { },
    })
  },

  /**
   * 修改信息
   */
  updateInfo: function () {
    const openid = wx.getStorageSync('openid')
    const data = {
      openid: openid,
      name: this.data.name,
      phone: this.data.phone,
      gender: this.data.gender
    }
    wx.request({
      url: app.data.baseUrl + 'weChat/custom/update',
      method: 'put',
      data: data,
      dataType: 'json',
      success: res => {
        if(res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            duration: 2000,
          })
        }
      },
      fail: function (res) { },
    })
  },

  /**
   * name
   */
   name: function(e) {
      this.setData({
        name: e.detail.value
      })
   },

  /**
  * phone
  */
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * gender
   */
  gender: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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