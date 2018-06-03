const APP_ID = 'wxb32df375196aa830';//输入小程序appid  
const APP_SECRET = 'a4c5e15e2f612d3cf1ed126acdff6001';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key 
const io = require('../../utils/weapp.socket.io.js');
const app = getApp();
Page({
  data: {
    items: [
      { name: '父亲', value: 'father', checked: 'true' },
      { name: '母亲', value: 'mather' },
      { name: '儿子', value: 'son' },
      { name: '女儿', value: 'daughter' },
    ],
    openId: null,
    role: 'father',
  },
  onLoad: function () {
    var that = this
    getOpenIdTap(that);
  },
  onShareAppMessage(config) {
    console.log(config)
    return {
      title: '',//转发标题
      path: '',//转发路径
      //imageUrl,//自定义图片路径
    }
  },
  radio_chooseRole(e) {
    /* 选择角色 */
    console.log(e.detail.value)
    this.setData({
      role: e.detail.value,
    })
  },
  button_enter() {
    /* 进入键 注册 跳主页 */


    wx.request({
      url: 'http://localhost:8443/user/set',
      method: 'POST',
      data: {
        openId: OPEN_ID,
        role: this.data.role,
        familyId: OPEN_ID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res = 'true') {
          //跳转主页
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else {
          wx.showToast({
            title: `注册失败${res}`,
            icon: '/images/error.png',
          })
        }
      }
    })
  },
  button_build() {
    /* 组建键 */
    wx.showShareMenu({
      withShareTicket: true,
      success: (e) => {
        console.log("转发成功")
      },
      fail() {
        console.log("转发失败");
      }
    })

  },

})
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
          that.setData({
            openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
            session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
          })
        }
      })
    }
  })
}