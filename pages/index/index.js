import { swiperItems_student } from "./swiperItems";
//获取应用实例
var app = getApp();
const io = require('../../utils/weapp.socket.io.js');
Page({
  data: {
    // swiperItems: [],

    // isStudent: true,//真正是学生
    // chooseStudent: true,//选择学生单选框
    // sId: null,
    // sImg: "/images/head.png",
    // sName: "520快乐",
    // sTodayCourse: null,
    // showDot: 0,
  },
  onLoad: function () {
    // this.setData({
    //   swiperItems: swiperItems
    // })

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
  // onShow(e) {
  //   var that = this;
  //   synchronizeDataFromGlobalData(that);
  //   console.log(this.data.sId)


  //   this.setData({
  //     swiperItems: swiperItems,
  //   })
  //   wx.request({
  //     url: 'http://geek-team.xin/student/findById',
  //     data: {
  //       sId: this.data.sId,
  //     },
  //     success(e) {
  //       console.log(e)
  //       that.setData(e.data)
  //       app.globalData.sName = e.data.sName
  //       getTodayCourse(that)
  //       // downloadHeaderImage(that, e)
  //     },
  //   })

  //   wx.request({
  //     url: 'http://geek-team.xin/teacher/findById',
  //     data: {
  //       tId: this.data.sId,
  //     },
  //     success(e) {
  //       getTodayCourse(that);
  //       //downloadHeaderImage(that, e)
  //     },
  //   })

  // },

  // swiperChange(e) {
  //   //e.detail.current   0 1 2
  //   console.log(e)
  //   this.setData({
  //     showDot: e.detail.current
  //   })
  // },
})

/*
* 同步全局变量到页面
*/
function synchronizeDataFromGlobalData(that) {
  that.setData({
    isStudent: app.globalData.isStudent,
    sId: app.globalData.sId,
    sImg: app.globalData.sImg,
    sName: app.globalData.sName
  })
}


