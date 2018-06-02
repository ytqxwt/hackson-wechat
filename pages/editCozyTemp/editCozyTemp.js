Page({
  data: {
    number:null,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    tempFilePaths: '',
  },
  tap() {
    console.log('tap')
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
   * 生命周期函数--监听页面初次渲染完成
   */


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
})