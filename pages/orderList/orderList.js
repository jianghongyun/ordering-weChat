const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder()
  },
  
  /**
   * 获取订单
   */
  getOrder: function(){
    wx.request({
      url: app.data.baseUrl + 'weChat/order/list',
      method: 'get',
      data: {openid: wx.getStorageSync('openid')},
      dataType: 'json',
      success: res => {
        const orderList = res.data.rows.map((obj,index,arr) => {
          obj.createdAt = this.changeTime(obj.createdAt)
        })
        this.setData({
          orderList: res.data.rows
        })
      },
      fail: function (res) { },
    })
  },
  
  /**
   * 跳转订单详情
   */
  orderDetail: function(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id
    })
  },
  
  /**
   * 转换时间
   */
  changeTime: function(time) {
    const date = new Date(time)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minite = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return year + '-' + month + '-' + day + '  ' + hour + ':' + minite + ':' + second;
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