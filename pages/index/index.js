//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    menuClassList: [],
    menuList: [],
    activeindex: 0,
    visible: false,
    orderTotalNum: 0,
    totalMoney: 0,
    menuVisible: false
  },
  onLoad: function () {
    this.getMenuClass();
    this.getMenu();
  },

  /**
   * 获取菜单分类
   */
  getMenuClass: function(){
    wx.request({
      url: app.data.baseUrl +'weChat/menuClass/alllist',
      method: 'GET',
      dataType: 'json',
      success: res => {
        const menuClassList = res.data.data
        this.setData({
          menuClassList: menuClassList
        })
      },
      fail: function(res) {},
    })
  },

  /**
   * 获取菜单
   */
  getMenu: function () {
    wx.request({
      url: app.data.baseUrl + 'weChat/menu/list',
      method: 'GET',
      dataType: 'json',
      success: res => {
        res.data.data.map((obj, index, arr) => {
          obj.orderNum = 0
        })
        this.setData({
          menuList: res.data.data
        })
      },
      fail: function (res) { },
    })
  },

  /**
   * 获取菜单详情
   */
  getMenuDetail: function(id){
    wx.request({
      url: app.data.baseUrl + 'weChat/menu/detail',
      method: 'GET',
      data: { id: id },
      dataType: 'json',
      success: res => {
        this.setData({
          menuDetail: res.data.menuDetail
        })
      },
      fail: function (res) { },
    })
  },

  /**
   * 点击获取详情
   */
  menuDetail: function(e) {
    const id = e.currentTarget.dataset.id
    this.getMenuDetail(id)
    this.setData({
      visible: true
    })
  },

  /**
   * 切换菜单分类
   */
  tabClick: function(e) {
    this.setData({
      activeindex: e.currentTarget.dataset.activeindex
    })
  },

  /**
   * 关闭弹出层
   */
  closeLayer: function() {
    this.setData({
      visible: false
    })
  },

  /**
   * 添加购物车
   */
  addCar: function(e) {
    const id = e.currentTarget.dataset.id
    const mark = e.currentTarget.dataset.mark //0:加，1:减
    let menuList = this.data.menuList
    let orderTotalNum = 0;
    let totalMoney = 0;
    menuList.map((obj, index, arr) => {          
      if (obj.id == id) {
        if (mark == '0') {
          obj.orderNum++
        } else {
          obj.orderNum--
        }        
      }
      orderTotalNum += obj.orderNum
      totalMoney = totalMoney + obj.orderNum * obj.price
    })
    this.setData({
      menuList: menuList,
      orderTotalNum: orderTotalNum,
      totalMoney: totalMoney
    })
  },

  /**
   * 点击购物袋
   */
  shoppingList: function() {
    this.setData({
      menuVisible: !this.data.menuVisible
    })
  },

  /**
   * 清空购物车
   */
  clear: function(){
    let menuList = this.data.menuList
    menuList.map((obj, index, arr) => {
      obj.orderNum = 0
    })
    this.setData({
      menuList: menuList,
      orderTotalNum: 0,
      totalMoney: 0
    })
  },

  /**
   * 关闭购物单弹出层
   */
  closeList: function() {
    this.setData({
      menuVisible: false
    })
  },

  /**
   * 结算
   */
  settle: function() {
    const orderTotalNum = this.data.orderTotalNum
    const totalMoney = this.data.totalMoney
    const menuList = this.data.menuList
    let orderArr = []
    menuList.map((obj, index, arr) => {
      if(obj.orderNum > 0) {
        orderArr.push({ id: obj.id, orderNum: obj.orderNum, menuName: obj.menuName, price: obj.price })
      }
    })
    getApp().globalData.orderArr = orderArr
   
    const arr = orderArr.toString()
    wx.navigateTo({
      url: '../settle/settle?orderTotalNum=' + orderTotalNum + '&totalMoney=' + totalMoney
    })
  }
})
