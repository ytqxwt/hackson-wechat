// pages/weather/weather.js
var app = getApp();
var weather = require("../../utils/weather.js");
Page({
  data: {
    relationArray: ['老爸', '老妈', '弟弟', '姐姐'],
    cityArray: ['北京', '金华', '成都'],
    weatherInfo: [],
    openId: app.globalData.openId,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '',
    view_turnOnAdd: false,
    relation: null,
  },
  onLoad: function () {
    var that = this
    //获取未添加城市的的关系
    //getNoCityRelation(that);

    //获得已添加城市的天气
    getCityWeather(that);
  },
  addNew() {
    this.setData({
      view_turnOnAdd: true,
    })
  },
  button_saveAdd() {
    var that = this
    console.log(that.data.region[2])
    if (that.data.relation && that.data.region[2]) {
      wx.request({
        url: 'http://localhost:8443/weather/set',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: app.globalData.openId,
          torole: that.data.relation,
          city: that.data.region[2],
        },
        success: (res) => {
          console.log(res)
          if (res.data) {
            wx.showToast({
              text: '添加成功',
              icon: 'success',
            })
          }
        },
        fail: (e) => {
          console.log(e)
        }
      })
      this.setData({
        view_turnOnAdd: false,
      })
    }
  },
  bindPickerChange: function (e) {
    var _relation = this.data.relationArray[e.detail.value]
    this.setData({
      relation: _relation
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
})

function getCityWeather(that) {
  wx.request({
    url: 'http://localhost:8443/user/getFamilyCity',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      id: app.globalData.familyId,
    },
    success: (res) => {
      console.log(res.data);
      var _list = new Array();
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[0].city);
        weather.getWeatherData(res.data[i].city, function (d) {
          console.log(d);
          if (d.status = 'ok') {
            _list.push(d.desc);
          }
          else {
            console.log(d);
          }
        });
      }
      that.setData({
        weatherInfo: _list
      });
    },
    fail: (e) => {
      console.log(e);
    }
  });
}

function getNoCityRelation(that) {
  wx.request({
    url: 'http://localhost:8443/',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      openId: app.globalData.openId,
    },
    success: (res) => {
      console.log(res);
      if (res == 'true') {
        that.setData({

        })
      }
      else {
      }
    },
    fail: (e) => {
      console.log(e);
    }
  });
}

