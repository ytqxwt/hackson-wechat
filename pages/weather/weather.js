// pages/weather/weather.js
var app = getApp();
Page({
  data: {
    array: ['老爸', '老妈', '弟弟', '姐姐'],
    openId: null,
  },
  onLoad: function (options) {
    var that = this
    getOpenIdTap(that);
    wx.request({
      url: '',//查询关系所需要的接口
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: 12345,
      },
      success: (res) => {
        console.log(res)
        if (res.data.result == true) {
          wx.navagat
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: `提交失败${res.data.massage}`,
            image: '/images/error.png',
          })
        }
      },
      fail: (e) => {
        console.log(`${e}`),
          wx.showToast({
            title: `提交失败${e}`,
            image: '/images/error.png',
          })
      }

    })
  },


  addWeather: function () {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  weatherSubmit: function (e) {
    //console.log("这是上传签到信息所需要的信息" + "::" + this.data.cChooseId + "::" + this.data.cTime + startTime + "::" + endTime);
    wx.request({
      url: '',//上传关系以及城市的URL
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {

      },
      success: (res) => {
        console.log(res)
        if (res.data.result == true) {
          wx.navagat
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: `提交失败${res.data.massage}`,
            image: '/images/error.png',
          })
        }
      },
      fail: (e) => {
        console.log(`${e}`),
          wx.showToast({
            title: `提交失败${e}`,
            image: '/images/error.png',
          })
      }

    })
  }
})

