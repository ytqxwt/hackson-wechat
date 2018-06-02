let col1H = 0;
Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    selection: null,
  },

  onLoad: function (options) {
    this.setData({
      selection: options.selection
    }),
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth; let wh = res.windowHeight; let imgWidth = ww * 0.48; let scrollH = wh; this.setData({ scrollH: scrollH, imgWidth: imgWidth }); //加载首组图片 
          this.loadImages();
        }
      })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id; let oImgW = e.detail.width; //图片原始宽度 
    let oImgH = e.detail.height; //图片原始高度 
    let imgWidth = this.data.imgWidth; //图片设置的宽度 
    let scale = imgWidth / oImgW; //比例计算 
    let imgHeight = oImgH * scale; //自适应高度 
    let images = this.data.images;
    let imageObj = null;
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img; break;
      }
    }
    imageObj.height = imgHeight;
    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    col1H += imgHeight;
    col1.push(imageObj);
    let data = {
      loadingCount: loadingCount,
      col1: col1,
    };

    if (!loadingCount) { data.images = []; } this.setData(data);
  },
  loadImages: function () {
    let images = [
      { pic: "../../images/" + this.data.selection + ".1.png", height: 0 },
      { pic: "../../images/" + this.data.selection + ".2.png", height: 0 },
      { pic: "../../images/" + this.data.selection + ".3.png", height: 0 },
      { pic: "../../images/" + this.data.selection + ".4.png", height: 0 },
      { pic: "../../images/" + this.data.selection + ".5.png", height: 0 },
    ];
    let baseId = "img-" + (+new Date());
    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }
    this.setData({
      loadingCount: images.length,
      images: images
    });
  }
})
