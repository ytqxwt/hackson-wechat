const APP_ID = 'wxb32df375196aa830';//输入小程序appid  
const APP_SECRET = 'a4c5e15e2f612d3cf1ed126acdff6001';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key 
App({
  onLaunch: function () {
    getOpenIdTap(this)
    //查询数据库是否有该用户,首次进入跳转sign
    // redirectToSign();
  },
  globalData: {
    familyId: 1,
    openId: null,
    role: null
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