// pages/weather/weather.js
var app = getApp();
var util = require("../../utils/util.js");
//获取OPENID相关
const APP_ID = 'wxb32df375196aa830';//输入小程序appid  
const APP_SECRET = 'a4c5e15e2f612d3cf1ed126acdff6001';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key 
Page({
  data: {
    relationArray: ['老爸', '老妈', '弟弟', '姐姐'],
    cityArray: ['北京', '金华', '成都'],
    weatherInfo: [],
    openId: null,
    region: ['广东省', '广州市', '海珠区'],
    customItem: ''
  },
  onLoad: function () {
    var that = this
    getOpenIdTap(that);
    for (var i = 0; i < this.data.cityArray.length; i++) {
      util.getWeatherData(this.data.cityArray[i], function (wd) {
        var _list = that.data.weatherInfo;
        _list[i] = wd;
        that.setData({
          wd: wd,
          weatherInfo: _list,
        });
        console.log(wd);
        console.log(that.data.weatherInfo);

      });
    }


  },
  onShow: function () {

  },

  addWeather: function () {
    wx.request({
      url: '',//查询关系数组所需要的接口
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: 12345,
      },
      success: (res) => {
        console.log(res)
        if (res.data != []) {
          that.setData({
            relationArray: res.data
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  weatherSubmit: function (e) {
    //console.log("这是信息所需要的" + "::" + this.data.cChooseId + "::" + this.data.cTime + startTime + "::" + endTime);
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
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }

})
/*
* 获取openid的
*/
function getOpenIdTap(that) {
  wx.login({
    success: function (res) {
      wx.request({
        //获取openid接口  
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
          appid: APP_ID,
          secret: APP_SECRET,
          js_code: res.code,
          grant_type: 'authorization_code'
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data)
          OPEN_ID = res.data.openid;//获取到的openid  
          SESSION_KEY = res.data.session_key;//获取到session_key  
          that.setData({
            openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
            session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
          })
        }
      })
    }
  })
}
