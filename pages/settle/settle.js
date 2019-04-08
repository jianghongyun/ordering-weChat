// pages/settle/settle.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArr: [],
    remark: '',
    tableNum: '',
    submit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const orderTotalNum = options.orderTotalNum
    const totalMoney = options.totalMoney
    const orderArr = getApp().globalData.orderArr
    this.setData({
      orderTotalNum: orderTotalNum,
      totalMoney: totalMoney,
      orderArr: orderArr
    })
  },

  /**
   * 提交订单
   */
  submitOrder: function(e){
    var form_id = e.detail.formId;
    const orderArr = []
    this.data.orderArr.map((obj, index, arr)=>{
      orderArr.push({ menuid: obj.id, menuNum: obj.orderNum})
    })
    const tableNum = this.data.tableNum;
    if (tableNum == '') {
      wx.showToast({
        title: '请填写桌号',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (String(tableNum).length > 2) {
      wx.showToast({
        title: '请正确填写桌号',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    const data = {
      openid: wx.getStorageSync('openid'),
      orderArr: orderArr,
      price: this.data.totalMoney,
      remark: this.data.remark,
      tableNum: this.change(tableNum)
    }
    if(!this.data.submit) {
      return
    }
    this.setData({
      submit: false
    })
    wx.request({
      url: app.data.baseUrl + 'weChat/order/add',
      method: 'post',
      data: data,
      dataType: 'json',
      success: res => {
       if (res.data.code == 0) {
         wx.showToast({
           title: '提交成功',
           icon: 'none',
           duration: 2000,
         })
         this.sendMsg(form_id, res.data.orderNum, this.changeTime(res.data.time))
         this.setData({
           submit: true
         })
         wx.switchTab({
           url: '../mine/mine'
         })
       }
      },
      fail: function (res) { },
    })
  },

  /**
   * 发送模板
   */
  sendMsg: function (form_id, orderNum, time) {
     const access_token = wx.getStorageSync('token')
     let content = ''
    this.data.orderArr.map((obj,index,arr) => {
      content += obj.menuName + '*' + obj.orderNum + '  '
    })
     const keywords = {
       keyword1: {'value': 'CF餐厅'},  //商家名称
       keyword2: {'value': content},  //订单内容
       keyword3: {'value': this.data.totalMoney+'元'},  //订单金额
       keyword4: {'value': orderNum},  //订单号码
       keyword5: {'value': time},  //下单时间
       keyword6: {'value': this.data.remark},  //备注
     }
     wx.request({
       url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
       data: {
         touser: wx.getStorageSync('openid'),
         template_id: 'x1ZO39_2ZMKxY00GFNyPb7fWA3IsWpho6Htlo3Vp3Ls',//申请的模板消息id，  
         page: '/pages/index/index',
         form_id: form_id,
         data: keywords,
         color: '#ccc',
         emphasis_keyword: 'keyword1.DATA'
       },
       method: 'post',
       dataType: 'json',
       success: function (res) {
         console.log(res)
       }
     })
   },

  /**
 * 转换时间
 */
  changeTime: function (time) {
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
   * 备注
   */
  remark: function(e){
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 桌号
   */
  tableNum: function(e){
    this.setData({
      tableNum: e.detail.value
    })
  },

  /**
   * 转字符串
   */
  change: function(val) {
    let tableNum = String(val)
    if (tableNum.length == 1) {
      tableNum = '00' + tableNum
    } else if (tableNum.length == 2){
      tableNum = '0' + tableNum
    } 
    return tableNum;
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