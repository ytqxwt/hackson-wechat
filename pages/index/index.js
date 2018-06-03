import { swiperItems } from "./swiperItems";
//获取应用实例
var app = getApp();
const io = require('../../utils/weapp.socket.io.js');
Page({
  data: {
    swiperItems: [],
    showDot: 0,
  },
  onLoad: function () {
    this.setData({
      swiperItems: swiperItems
    })

    //建立长连接
    app.globalData.socket = (this.socket = io(
      `ws://geek-team.xin/wss?openId=${app.globalData.openId}&familyId=${app.globalData.familyId}`,
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
    this.setData({
      swiperItems: swiperItems,
    })


  },

  swiperChange(e) {
    console.log(e)
    this.setData({
      showDot: e.detail.current
    })
  },
})



