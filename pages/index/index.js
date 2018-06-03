import { swiperItems } from "./swiperItems";
//获取应用实例
var app = getApp();
const io = require('../../utils/weapp.socket.io.js');
Page({
  data: {
    swiperItems: [],
    sImg: null,
    showDot: 0,
  },
  onLoad: function () {
    this.setData({
      swiperItems: swiperItems
    })

    //建立长连接
    app.globalData.socket = (this.socket = io(
      `ws://localhost:9000?openId=${app.globalData.openId}&familyId=${app.globalData.familyId}`,
    ))
    console.log(this.socket)
    this.socket.on('connect', function () {
      console.log('You joined')
    })

    this.socket.on('connect_error', function (d) {
      console.log(`connect_error: ${d}`)
    })
  },
  onShow(e) {
    var that = this;
    // synchronizeDataFromGlobalData(that);
    this.setData({
      swiperItems: swiperItems,
    })
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            sImg = simpleUser.avatarUrl
            app.globalData.sName = simpleUser.nickName
            that.setData({
              nickName: simpleUser.nickName,
              sImg: simpleUser.avatarUrl,
            })
          }
        });
      }
    });
  },

  swiperChange(e) {
    console.log(e)
    this.setData({
      showDot: e.detail.current
    })
  },
})

/*
* 同步全局变量到页面
*/
function synchronizeDataFromGlobalData(that) {
  that.setData({
    sImg: app.globalData.sImg,
  })
}


