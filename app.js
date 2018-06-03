const APP_ID = 'wxb32df375196aa830';//输入小程序appid  
const APP_SECRET = 'a4c5e15e2f612d3cf1ed126acdff6001';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key 
const io = require('../../utils/weapp.socket.io.js');
App({
  onLaunch: function () {
    getOpenIdTap(this)
    //查询数据库是否有该用户,首次进入跳转sign
    // redirectToSign();
    latitude: 40.137257;

    //创建变量保存经度
    longitude: 116.680165;

    //创建一个变量，保存当前城市信息
    city: "";
    var _this = this;
    //创建变量保存纬度

    //一加载，获取用户的位置信息
    wx.getLocation({
      success: function (res) {
        // 成功设置经度和纬度
        _this.latitude = res.latitude;
        _this.longitude = res.longitude;

        //根据经纬度获取城市信息，调用baiduAPI
        var bdAPI = "https://api.map.baidu.com/geocoder/v2/?location=" + _this.latitude + "," + _this.longitude + "&output=json&pois=1&ak=FE682f52d5170f3f11d267ec0b9ae2f1";

        console.log(res);

        //发送请求加载地址信息
        wx.request({
          url: bdAPI,
          success: function (res) {
            console.log(res.data.result.addressComponent.city);
            _this.city = res.data.result.addressComponent.city;
          }
        })
      }
    })
  },
  globalData: {
    familyId: 1,
    openId: null,
    role: null,
    socket:null,
  }
})

function redirectToSign() {
  wx.request({
    url: 'http://localhost:8443/user/isFirst',
    method: 'POST',
    data: {
      openId: OPEN_ID,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: (idFirst) => {
      if (idFirst) {
        wx.redirectTo({
          url: '/pages/sign/sign',
        });
      }
    }
  });
}

/*
* 获取openid
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
          that.globalData.openId = res.data.openid;
        }
      })
    }
  })
}
