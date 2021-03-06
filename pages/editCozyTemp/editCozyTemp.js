var app = getApp();
Page({
  data: {
    listData: [
      "爸爸", "妈妈", "弟弟"
    ],
    number: null,
    showModalStatus: false,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
    }],
    tempFilePaths: '',
    texts: [{
      number: 10,
      text1: "今天将会下雨,出行记得带伞哦"
    }, {
      number: 11,
      text1: "早安",
      text2: "亲爱的",
    },
    {
      number: 20,
      text1: '今天是您的生日，感谢您给予我生命，感谢您抚育我成长，在今天这个重要的日子里，衷心的祝福您：生日快乐!'
    },
    {
      number: 21,
      text1: '生日蛋糕是我甜蜜的祝福，摇曳的烛光是我点点的心愿，愿你每一天都快乐，愿好运时刻相伴，愿你好梦成真，愿你幸福如意，愿你生日快乐。'
    },
    {
      number: 22,
      text1: '你是大树，伟岸的身躯，为我遮蔽风风雨雨；你是太阳，普照的光芒，孕育着我茁壮成长；亲爱的爸爸，儿子为你送上生日祝福，祝你健康、长寿！'
    },
    {
      number: 30,
      text1: '老爸，今天是我太衝動了，抱歉，我仔細想了想，覺得應該跟你說句對不起~'
    },
    {
      number: 31,
      text1: '如果和父母闹矛盾了，要记得冷静哦！~'
    }
    ]



  },
  tap(e) {
    console.log('tap')
  },

  submitMessage(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    app.globalData.socket.emit("sendTo", "hello", (d) => {
      console.log(d)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number: options.selection + options.tempName
    })
    console.log("传递下来的模板编号" + this.data.number);
  },

  startRecode: function () {
    var s = this;
    console.log("start");
    wx.startRecord({
      success: function (res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        s.setData({ recodePath: tempFilePath, isRecode: true });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
      }
    });
  },
  endRecode: function () {//结束录音 
    var s = this;
    console.log("end");
    wx.stopRecord();
    s.setData({ isRecode: false });


    wx.showToast();
    setTimeout(function () {
      var urls = app.globalData.urls + "/Web/UpVoice";//存语音的URL
      console.log(s.data.recodePath);
      wx.uploadFile({
        url: urls,
        filePath: s.data.recodePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          var str = res.data;
          var data = JSON.parse(str);
          if (data.states == 1) {
            var cEditData = s.data.editData;
            cEditData.recodeIdentity = data.identitys;
            s.setData({ editData: cEditData });
          }
          else {
            wx.showModal({
              title: '提示',
              content: data.message,
              showCancel: false,
              success: function (res) {

              }
            });
          }
          wx.hideToast();
        },
        fail: function (res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: "网络请求失败，请确保网络是否正常",
            showCancel: false,
            success: function (res) {

            }
          });
          wx.hideToast();
        }
      });
    }, 1000)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 从相册选择照片或拍摄照片
  chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },


  submitMessage(e) {
    console.log('aaa')
    console.log(app.globalData.socket)
    app.globalData.socket.emit("sendTo", "hello", (d) => {
      console.log(d)
    })
  },

  chooseLesson: function (e) {
    var arr = this.data.listData;
    var cName = arr[0].cName;
    this.setData({
      changeLesson: cName
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})