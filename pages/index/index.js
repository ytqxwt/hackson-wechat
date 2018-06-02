import { swiperItems } from "./swiperItems";
//获取应用实例
var app = getApp();
Page({
  data: {
    swiperItems: [],

    isStudent: true,//真正是学生
    chooseStudent: true,//选择学生单选框
    sId: null,
    sImg: "/images/head.png",
    sName: "520快乐",
    sTodayCourse: null,
    showDot: 0,
  },
  onLoad: function () {
    this.setData({
      swiperItems: swiperItems
    })
  },
  onShow(e) {
    var that = this;
    synchronizeDataFromGlobalData(that);
    console.log(this.data.sId)


    this.setData({
      swiperItems: swiperItems,
    })
    wx.request({
      url: 'http://geek-team.xin/student/findById',
      data: {
        sId: this.data.sId,
      },
      success(e) {
        console.log(e)
        that.setData(e.data)
        app.globalData.sName = e.data.sName
        getTodayCourse(that)
        // downloadHeaderImage(that, e)
      },
    })

    wx.request({
      url: 'http://geek-team.xin/teacher/findById',
      data: {
        tId: this.data.sId,
      },
      success(e) {
        getTodayCourse(that);
        //downloadHeaderImage(that, e)
      },
    })

  },

  swiperChange(e) {
    //e.detail.current   0 1 2
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
    isStudent: app.globalData.isStudent,
    sId: app.globalData.sId,
    sImg: app.globalData.sImg,
    sName: app.globalData.sName
  })
}


