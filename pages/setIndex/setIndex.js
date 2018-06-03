//index.js
//获取应用实例
const app = getApp();
var colorName1 = {
  color1: '#bbbbbb'
};
var colorName2 = {
  color2: '#bbbbbb'
};

Page({
  data: {
    items1: [
      { name: 'teacher', value: '教师' }
    ],
    items2: [
      { name: 'student', value: '学生' }
    ],
    colorName1,
    colorName2
  },
  changeColor1: function (e) {
    this.setData({
      color1: '#6489cd',
      color2: '#bbbbbb'
    })
  },
  changeColor2: function (e) {
    this.setData({
      color2: '#6489cd',
      color1: '#bbbbbb'
    })
  }
})
