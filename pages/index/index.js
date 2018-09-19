//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    home_ip: 'null',
    ip_updated:'null',
    userInfo: {},
    ipInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
   var that=this
    wx.request({
      url: "https://apex.oracle.com/pls/apex/nan/my/ip/",
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        app.globalData.ipInfo = res.data
        that.setData({
          home_ip: res.data.ip,
          ip_updated: res.data.updated
        });
      }
    })
  },
  clickMe: function (e) {
    console.log(app.globalData.ip_info)
    this.setData({
      ip_info: app.globalData.ip_info,
    })
  }, 
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo 
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
 
})
