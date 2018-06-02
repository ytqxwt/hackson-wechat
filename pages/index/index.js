<<<<<<< HEAD
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
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
    }
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
=======
import { swiperItems_student, swiperItems_teacher } from "./swiperItems";
var util = require("../../utils/util.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    data_swiperItems: {},
    defaultUrl: "/pages/sign/sign",
    isStudent: true,//真正是学生
    chooseStudent: true,//选择学生单选框
    sId: null,
    sImg: "/images/head.png",
    sName: "520快乐",
    sTodayCourse: null,
    showDot: 0,
  },
  onLoad: function (e) {

    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数
    util.getWeatherData(null, function (wd) {
      _this.setData({ wd: wd });
      console.log("??啥" + wd);
    });

    this.setData({
      data_swiperItems: swiperItems_student
    })
  },
  onShow(e) {
    var that = this;
    synchronizeDataFromGlobalData(that);
    if (this.data.sId != null) {
      if (this.data.isStudent) {
        this.setData({
          data_swiperItems: swiperItems_student,
        })
        wx.request({
          url: 'http://geek-team.xin/student/findById',
          data: {
            sId: this.data.sId,
          },
          success(e) {
            that.setData(e.data)
            app.globalData.sName = e.data.sName
            getTodayCourse(that)
            downloadHeaderImage(that, e)
          },
        })
      } else {
        this.setData({
          data_swiperItems: swiperItems_teacher,
        })
        wx.request({
          url: 'http://geek-team.xin/teacher/findById',
          data: {
            tId: this.data.sId,
          },
          success(e) {
            wx.downloadFile({
              url: `http://geek-team.xin/file/downloadFile?uri=${e.data.tImg}`,
              success(res) {
                if (res.statusCode === 200) {
                  that.setData({
                    sImg: res.tempFilePath,
                    sName: e.data.tName
                  })
                  app.globalData.sImg = res.tempFilePath
                  app.globalData.sName = e.data.tName
                } else {
                  console.log(res.data)
                }
              },
              fail: (e) => console.log(e)
            })
            wx.request({
              url: `http://geek-team.xin/schedule/wx_getTeacherScheduleByDay?tId=${that.data.sId}`,
              method: 'POST',
              success(res) {
                console.log(res)
                //{{item.cAddress}}{{item.cName}}{{item.time}}
                if (res.data.length != 0) {
                  that.setData({
                    sTodayCourse: res.data
                  })
                }
              },
              fail: (e) => console.log(e)
            })

            getTodayCourse(that);
            downloadHeaderImage(that, e)

          },
        })
      }
    }
  },

  radioChange_stuOrTea(e) {
    if (e.detail.value == 'teacher') {
      this.setData({
        data_swiperItems: swiperItems_teacher,
        chooseStudent: false,
      })
    } else {
      this.setData({
        data_swiperItems: swiperItems_student,
        chooseStudent: true,
      })
    }
  },
  swiperChange(e) {
    //e.detail.current   0 1 2
    //console.log(e)
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
/*
* 获取备忘录
*/
function getTodoList() {
  wx.getStorage({
    key: 'todolist',
    success: function (res) {
      if (res.data) {
        that.setData({
          lists: res.data
        })
      }
    }
  })
}
/*
* 获得今天课程
*/
function getTodayCourse(that) {
  console.log(that)
  var wx_getWhat = that.data.isStudent ? '' : "Teacher";
  var idWhat = that.data.isStudent ? 'sId' : 'tId'
  wx.request({
    url: `http://geek-team.xin/schedule/wx_get${wx_getWhat}ScheduleByDay?${idWhat}=${that.data.sId}`,
    method: 'POST',
    success(res) {
      // console.log(res)
      //{{item.cAddress}}{{item.cName}}{{item.tName}}{{item.time}}
      //{{item.cAddress}}{{item.cName}}{{item.time}}
      if (res.data != []) {
        that.setData({
          sTodayCourse: res.data
        })
        console.log(res.data)
      }
    },
    fail: (e) => console.log(e)
  })
}
/*
* 下载头像
*/
function downloadHeaderImage(that, e) {
  var _isStudent = that.data.isStudent
  wx.downloadFile({
    url: `http://geek-team.xin/file/downloadFile?uri=${_isStudent ? e.data.sImg : e.data.tImg}`,
    success(res) {
      if (res.statusCode === 200) {
        that.setData({
          sImg: res.tempFilePath,
          sName: _isStudent ? e.data.sName : e.data.tName
        })
        app.globalData.sImg = res.tempFilePath
        app.globalData.sName = _isStudent ? e.data.sName : e.data.tName
        console.log('下载成功，啦啦啦')
      } else {
        console.log(res)
      }
    },
    fail: (e) => console.log(e)
  })
}


>>>>>>> 1614878154377bf81586c68794e6d91385a5524d
